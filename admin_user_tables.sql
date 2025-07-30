-- USERS Table (common for login)
drop table users;


CREATE TABLE users (
  id INT PRIMARY KEY IDENTITY(1,1),
  name nvarchar(100) not null,
  email NVARCHAR(255) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  role NVARCHAR(50) NOT NULL,
  created_by INT, -- ID of the creator (like company_admin)
  created_at DATETIME DEFAULT GETDATE()
);


INSERT INTO users (name,email, password, role, created_by)
VALUES ('Nefway Admin','nefway@admin.com', 'hashedpassword123', 'nefway_admin', NULL);

INSERT INTO users (name,email, password, role, created_by)
VALUES ('Super Corporate Admin','superadmin@corp.com', 'hashed2', 'super_corporate_admin', 1);

INSERT INTO users (name,email, password, role, created_by)
VALUES ('Corporate Admin','corpadmin@corp.com', 'hashed3', 'corporate_admin', 2);

INSERT INTO users (name,email, password, role, created_by)
VALUES ('Vendor Admin','vendoradmin@example.com', 'hashed4', 'vendor_admin', 2);

INSERT INTO users (name,email, password, role, created_by)
VALUES ('Employee One','employee1@corp.com', 'hashed5', 'corporate_employee', 3);

INSERT INTO users (name,email, password, role, created_by)
VALUES ('Employee Cab/Driver','cabdriver@vendor.com', 'hashed6', 'cab_driver_vendor', 4);


Select * from users;





drop table super_corporate_admin;


-- SUPER CORPORATE ADMIN Table
CREATE TABLE super_corporate_admin (
  id INT PRIMARY KEY IDENTITY(1,1),
  user_id INT FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
  fullName NVARCHAR(100),
  username NVARCHAR(100),
  mobile NVARCHAR(20),
  gender NVARCHAR(10),
  profilePhoto NVARCHAR(255),
  designation NVARCHAR(100),

  -- Company
  companyName NVARCHAR(100),
  corporateCode NVARCHAR(100),
  department NVARCHAR(100),
  officeLocation NVARCHAR(100),
  --Authentication & Access
   role NVARCHAR(50),
  otp NVARCHAR(10),
  twoFactor BIT,
  -- Contact
  alternateContact NVARCHAR(20),
  officialEmail NVARCHAR(100),
  preferredContact NVARCHAR(50),

  -- Verification
  idProof NVARCHAR(255),
  corporateIdCard NVARCHAR(255),
  employeeCode NVARCHAR(100),
  digitalSignature NVARCHAR(255),

  created_at DATETIME DEFAULT GETDATE()
);



select * from super_corporate_admin

-- Assume the super admin inserted above has user_id = 1
INSERT INTO super_corporate_admin (
  user_id, fullName, username, mobile, gender,
  profilePhoto, designation, companyName, corporateCode,
  department, officeLocation, alternateContact,
  officialEmail, preferredContact, idProof,
  corporateIdCard, employeeCode, digitalSignature
)
VALUES (
  1, 'John Doe', 'johndoe', '9876543210', 'Male',
  'john.jpg', 'Director', 'MegaCorp Ltd.', 'MC001',
  'IT', 'New York HQ', '1234567890',
  'john.doe@megacorp.com', 'email', 'idproof.jpg',
  'corporateid.jpg', 'EMP123', 'signature.png'
);

select * from super_corporate_admin;