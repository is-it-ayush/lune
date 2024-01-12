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

use crate::{error::AppError, RequestState};
use diesel::{
    r2d2::{ConnectionManager, Pool},
    PgConnection,
};
use hyper::{Body, Request, Response, StatusCode};
use routerify::RequestInfo;
use serde::{de::DeserializeOwned, ser::Serialize};
use std::{
    env,
    sync::{Arc, Mutex},
};

const DATABASE_URI_VARIABLE: &'static str = "DATABASE_URL";

/// Root Error Handler. The function handlers the request/response errors globally across the API.
pub async fn error_handler(error: routerify::RouteError, info: RequestInfo) -> Response<Body> {
    dbg!(&error);
    let state_option = info.data::<Arc<Mutex<RequestState>>>();
    if let Some(state) = state_option {
        if let Ok(lock) = state.lock() {
            eprintln!("[Error] RequestId: {}, {}", lock.request_id, error);
        }
    }
    Response::builder()
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .body(Body::from("Something went wrong!"))
        .unwrap()
}

/// Build a connection pool. Uses r2d2 to wrap the postgres connection from diesel.
pub fn get_connection_pool() -> Result<Pool<ConnectionManager<PgConnection>>, AppError> {
    let database_url = env::var(DATABASE_URI_VARIABLE).map_err(|e| AppError::EnvironmentError {
        variable: DATABASE_URI_VARIABLE.to_string(),
        source: e,
    })?;

    let manager = ConnectionManager::<PgConnection>::new(database_url);

    Pool::builder()
        .test_on_check_out(true)
        .build(manager)
        .map_err(|e| AppError::PoolError(e))
}

/// A generic helper to deserialize a request body to a expected struct type.
pub async fn deserialize_body<T: DeserializeOwned>(req: &mut Request<Body>) -> Result<T, AppError> {
    let body = hyper::body::to_bytes(req.body_mut())
        .await
        .map_err(|e| AppError::StreamError(e))?;
    let bytes = body.to_vec();
    serde_json::from_slice::<T>(bytes.as_slice()).map_err(|e| AppError::JsonTransformError(e))
}

/// A generic helper to serialize a response body to a expected struct type.
pub async fn serialize_body<T: Serialize>(data: T) -> Result<Body, AppError> {
    let body = serde_json::to_string(&data).map_err(|e| AppError::JsonTransformError(e))?;
    Ok(Body::from(body))
}
