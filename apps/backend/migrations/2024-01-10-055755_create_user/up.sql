--- Lune
--- Copyright (C) 2024 ayush.
---
--- This program is free software: you can redistribute it and/or modify
--- it under the terms of the GNU Affero General Public License as published by
--- the Free Software Foundation, either version 3 of the License, or
--- (at your option) any later version.
---
--- This program is distributed in the hope that it will be useful,
--- but WITHOUT ANY WARRANTY; without even the implied warranty of
--- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
--- GNU Affero General Public License for more details.
---
--- You should have received a copy of the GNU Affero General Public License
--- along with this program.  If not, see <http://www.gnu.org/licenses/>.

-- A reusable function/procedure to automatically update
-- the "updated_at" fields on the table.
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';


-- the user table.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,

  -- fields
  email VARCHAR(300) NOT NULL UNIQUE,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(300) NOT NULL,
  blacklisted BOOLEAN NOT NULL DEFAULT FALSE,

  -- time
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- user table triggers
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();
