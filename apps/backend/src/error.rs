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

/// While the error could be different, the underlying "source" is of same type.
/// since most errors (even from crates) still utilise the generic error
/// struct.
type GenericRustError = Box<dyn std::error::Error + Send + Sync>;


#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("Could not build router: {0}")]
    RouterError(#[source] GenericRustError),

    #[error("Could not build service: {0}")]
    ServiceError(#[source] GenericRustError),

    #[error("Could not parse request stream: {0}")]
    StreamError(#[source] hyper::Error),

    #[error("Could not build response: {0}")]
    ResponseError(#[source] hyper::http::Error),

    #[error("Could not build connection pool: {0}")]
    PoolError(#[source] diesel::r2d2::PoolError),

    #[error("Could not process ${variable}: {source}")]
    EnvironmentError {
        variable: String,
        #[source]
        source: std::env::VarError,
    },

    #[error("Could not access request state.")]
    InvalidStateError,

    #[error("Could not acquire a lock onto the request state: {0}")]
    LockStateError(String),

    #[error("Could not transform JSON: {0}")]
    JsonTransformError(#[from] serde_json::Error),
}
