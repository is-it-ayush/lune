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

use crate::{error::AppError, helpers::deserialize_body};
use hyper::{Body, Request, Response, StatusCode};
use routerify::Router;
use serde::{Deserialize, Serialize};

/// create /auth router.
pub fn get_auth_router() -> Result<Router<Body, AppError>, AppError> {
    Router::builder()
        .post("/login", login_handler)
        .post("/signup", signup_handler)
        .build()
        .map_err(|e| AppError::RouterError(e))
}

#[derive(Deserialize, Serialize, Debug)]
struct LoginRequest {
    pub login: String,
    pub password: String,
}
/// POST /auth/login
pub async fn login_handler(mut req: Request<Body>) -> Result<Response<Body>, AppError> {
    let body = deserialize_body::<LoginRequest>(&mut req).await?;
    // let state = req
    //     .data::<Arc<Mutex<RequestState>>>()
    //     .ok_or(AppError::InvalidStateError)?;
    // let mut lock = state
    //     .lock()
    //     .map_err(|e| AppError::LockStateError(e.to_string()))?;
    // let db_con = lock.db.get()?;

    Response::builder()
        .status(StatusCode::OK)
        .body(Body::from(format!("Login @ {}!", body.login)))
        .map_err(|e| AppError::ResponseError(e))
}

#[derive(Deserialize, Serialize, Debug)]
struct SignupRequest {
    pub email: String,
    pub password: String,
}
/// POST /auth/signup
pub async fn signup_handler(mut req: Request<Body>) -> Result<Response<Body>, AppError> {
    let body = deserialize_body::<SignupRequest>(&mut req).await?;
    // let state = req
    //     .data::<Arc<Mutex<RequestState>>>()
    //     .ok_or(AppError::InvalidStateError)?;
    // let mut lock = state
    //     .lock()
    //     .map_err(|e| AppError::LockStateError(e.to_string()))?;
    // let db_con = lock.db.get()?;

    Response::builder()
        .status(StatusCode::OK)
        .body(Body::from(format!("Signup @ {}", body.email)))
        .map_err(|e| AppError::ResponseError(e))
}
