// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        #[max_length = 300]
        email -> Varchar,
        #[max_length = 30]
        username -> Varchar,
        #[max_length = 300]
        password -> Varchar,
        blacklisted -> Bool,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
