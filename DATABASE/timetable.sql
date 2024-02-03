 create table users(
     userid int auto_increment primary key,
     username varchar(40) not null,
     password varchar(40) not null,
     role ENUM('admin','student') not null);

 INSERT INTO users (username, password, role) VALUES
    ('admin1', '1234', 'admin'),
    ('student1', '1234', 'student');

create table students(
    studentID int auto_increment primary key,
    first_name varchar(40) not null,
    lastname varchar(40) not null,
    reg_number varchar(40) not null,
    password varchar(40) not null
    );

create table timetable(
    timetableID int auto_increment primary key,
    date date not null,
    subject varchar(40) not null,
    period varchar(40) not null,
    room varchar(40) not null
     );
