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
use hyper::{Body, Request};
use routerify::ext::RequestExt;
use std::sync::{Arc, Mutex};
use ulid::Ulid;

/// First middleware to be invoked by the incoming request. It attaches some information
/// to the request state.
pub async fn attach_context(req: Request<Body>) -> Result<Request<Body>, AppError> {
    // acquire a lock onto state
    let state = req
        .data::<Arc<Mutex<RequestState>>>()
        .ok_or(AppError::InvalidStateError)?;
    let mut lock = state
        .lock()
        .map_err(|e| AppError::LockStateError(e.to_string()))?;
    lock.request_id = Ulid::new().to_string().to_lowercase();

    drop(lock);
    Ok(req)
}
