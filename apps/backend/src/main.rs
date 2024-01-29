/*
* Lune
* Copyright (C) 2024 ayush.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

use crate::error::AppError;
use crate::helpers::{error_handler, get_connection_pool};
use crate::middlewares::attach_context;
use auth::get_auth_router;
use diesel::pg::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use dotenv::dotenv;
use hyper::{Body, Request, Response, Server};
use routerify::{Middleware, Router, RouterService};
use serde_json::json;
use std::net::SocketAddr;
use std::sync::{Arc, Mutex};

mod auth;
mod users;

mod error;
mod helpers;
mod middlewares;
mod schema;

type PostgresConnectionPool = Pool<ConnectionManager<PgConnection>>;

/// Shared State throughout the lifetime
/// of a single request.
pub struct RequestState {
    /// A unique request ID.
    pub request_id: String,
    /// A pool of connections.
    pub pool: PostgresConnectionPool,
}

impl RequestState {
    /// Create default Request State with a connection pool.
    pub fn new(connection_pool: PostgresConnectionPool) -> Self {
        Self {
            request_id: String::new(),
            pool: connection_pool,
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), AppError> {
    dotenv().ok();
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));

    // create default state.
    let db_pool = get_connection_pool()?;
    let state = RequestState::new(db_pool);

    // create router.
    let root_router = get_root_router(state)?;
    let service = RouterService::new(root_router).map_err(|e| AppError::ServiceError(e))?;
    let server = Server::bind(&addr).serve(service);

    // server.
    println!("[Debug] The server is running on {}", addr);
    if let Err(e) = server.await {
        eprintln!("[Error] {e}");
    }

    Ok(())
}

pub fn get_root_router(state: RequestState) -> Result<Router<Body, AppError>, AppError> {
    // other routers (scoped)
    let auth_router = get_auth_router()?;

    Router::builder()
        .data(Arc::new(Mutex::new(state)))
        .middleware(Middleware::pre(attach_context))
        .get("/health", health_handler)
        .scope("/auth", auth_router)
        .err_handler_with_info(error_handler)
        .build()
        .map_err(|e| AppError::RouterError(e))
}

/// The only exposed endpoint other than /api group. It's use is for healthcheck.
async fn health_handler(_: Request<Body>) -> Result<Response<Body>, AppError> {
    Ok(Response::new(Body::from(
        json!({
            "status": "online",
            "date": chrono::Utc::now()
        })
        .to_string(),
    )))
}
