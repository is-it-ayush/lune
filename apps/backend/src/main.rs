/// Lune
/// Copyright (C) 2024 ayush.
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU Affero General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU Affero General Public License for more details.
///
/// You should have received a copy of the GNU Affero General Public License
/// along with this program.  If not, see <http://www.gnu.org/licenses/>.
use anyhow::{anyhow, Result};
use dotenv::dotenv;
use hyper::{Body, Request, Response, Server, StatusCode};
use routerify::prelude::*;
use routerify::{Middleware, RequestInfo, Router, RouterService};
use std::net::SocketAddr;
use std::sync::{Arc, Mutex};
use ulid::Ulid;

#[derive(Debug)]
pub struct RequestState {
    pub request_id: String,
}

#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    dotenv().ok();
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let state = RequestState {
        request_id: String::new(),
    };
    let router = Router::builder()
        .data(Arc::new(Mutex::new(state)))
        .middleware(Middleware::pre(attach_context))
        .get("/", index_handler)
        .err_handler_with_info(error_handler)
        .build()
        .map_err(|e| anyhow!("Could not create router: {e}"))?;
    let service =
        RouterService::new(router).map_err(|e| anyhow!("Could not create service: {e}"))?;
    let server = Server::bind(&addr).serve(service);

    println!("[Debug] The server is running on {}", addr);
    if let Err(e) = server.await {
        eprintln!("[Error] {e}");
    }

    Ok(())
}

/// Middlewares

async fn error_handler(error: routerify::RouteError, info: RequestInfo) -> Response<Body> {
    let state_option = info.data::<Arc<Mutex<RequestState>>>();
    if let Some(state) = state_option {
        if let Ok(lock) = state.lock() {
            eprintln!("[Error] RequestId: {} | {}", lock.request_id, error);
        }
    }
    Response::builder()
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .body(Body::from("Something went wrong!"))
        .unwrap()
}

async fn attach_context(req: Request<Body>) -> Result<Request<Body>, anyhow::Error> {
    // acquire a lock onto state
    let state = req
        .data::<Arc<Mutex<RequestState>>>()
        .ok_or(anyhow!("Could not access state."))?;
    let mut lock = state
        .lock()
        .map_err(|e| anyhow!("Could not acquire a lock onto state: {e}"))?;
    lock.request_id = Ulid::new().to_string().to_lowercase();

    drop(lock);
    Ok(req)
}

/// Routes

async fn index_handler(req: Request<Body>) -> Result<Response<Body>, anyhow::Error> {
    let state = req
        .data::<Arc<Mutex<RequestState>>>()
        .ok_or(anyhow!("Could not access state."))?;
    let lock = state
        .lock()
        .map_err(|e| anyhow!("Could not acquire a lock onto state: {e}"))?;
    Ok(Response::new(Body::from(format!(
        "Hi {}, Wubba Lubba Dub Dub!",
        lock.request_id
    ))))
}
