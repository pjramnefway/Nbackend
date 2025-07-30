



select * from users;


CREATE TABLE super_corporate_admin (
  id INT PRIMARY KEY IDENTITY,
  user_id INT FOREIGN KEY REFERENCES users(id),
  
  fullName NVARCHAR(100),
  username NVARCHAR(100),
  mobile NVARCHAR(20),
  gender NVARCHAR(10),
  profilePhoto NVARCHAR(255),
  designation NVARCHAR(100),
  
  companyName NVARCHAR(100),
  corporateCode NVARCHAR(100),
  department NVARCHAR(100),
  officeLocation NVARCHAR(100),
  
  alternateContact NVARCHAR(20),
  officialEmail NVARCHAR(100),
  preferredContact NVARCHAR(50),
  
  idProof NVARCHAR(255),
  corporateIdCard NVARCHAR(255),
  employeeCode NVARCHAR(100),
  digitalSignature NVARCHAR(255),
  
  otp NVARCHAR(10),
  twoFactor BIT DEFAULT 0,
  createdAt DATETIME DEFAULT GETDATE()
);

insert into users(name,email,password,role,created_by)
values('aravindh','aravindh@fakemail.com','hash25','cab_driver_vendor',2);


update users set password = '$2b$10$3SmNhiVFG.GL26MLxgftQeS5arUWem7LWipqYuYj8fEq2f4fUvJ9m' where id = 1;

select * from super_corporate_admin;