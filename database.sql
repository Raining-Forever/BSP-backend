CREATE DATABASE bsp;

CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    idcard TEXT,
    title TEXT,
    firstname TEXT,
    lastname TEXT,
    birthday DATE,
    tel TEXT,
    email TEXT,
    weight TEXT,
    height TEXT,
    gender TEXT,
    isCovidTest BOOLEAN,
    proofType INT,
    isDetected BOOLEAN,
    proofUrl TEXT,
    address TEXT,
    province TEXT,
    district TEXT,
    subDistrict TEXT,
    postalCode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into user_info (idcard, firstname) values ('12345', 'test1');

CREATE TABLE symtom (
    id SERIAL PRIMARY KEY,
    fever BOOLEAN,
    cough BOOLEAN,
    snot BOOLEAN,
    sore_throat BOOLEAN,
    smell BOOLEAN,
    taste BOOLEAN,
    conjunctivitis BOOLEAN,
    rash BOOLEAN,
    liquid_stool BOOLEAN,
    liquid_stool_frequenly BOOLEAN,
    angina BOOLEAN,
    tired BOOLEAN,
    dizzy BOOLEAN,
    pneumonia BOOLEAN,
    complication BOOLEAN,
    sore_breath BOOLEAN,
    slow_response BOOLEAN,
    unconscious BOOLEAN,
    onset_date DATE,
    diabetes_obesity BOOLEAN,
    complications BOOLEAN,
    cardiovascular BOOLEAN,
    heart_failure BOOLEAN,
    lung_disease BOOLEAN,
    asthma BOOLEAN,
    chronic_lung BOOLEAN,
    malignant_tumors BOOLEAN,
    cancer BOOLEAN,
    chronic_kidney BOOLEAN,
    ckd34 BOOLEAN,
    kidney_failure_transplant BOOLEAN,
    rheumatoid_arthritis BOOLEAN,
    immunosuppressants BOOLEAN,
    chronic_liver BOOLEAN,
    respire_rate INT,
    pulse INT,
    o2_flowrate INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into symtom (fever, cough) values (false, false);

CREATE TABLE patients(
    id SERIAL PRIMARY KEY,
    user_info_id INT REFERENCES user_info,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into patients (user_info_id) values (1);

----------------------------------------------------------------------

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT,
    is_admin BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into users (email, is_admin) values ('test@gmail.com', false);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users ON DELETE CASCADE,
    email TEXT,
    idcard TEXT,
    title TEXT,
    firstname TEXT,
    lastname TEXT,
    birthday DATE,
    tel TEXT,
    weight TEXT,
    height TEXT,
    gender TEXT,
    is_covid_test BOOLEAN,
    proof_type INT,
    is_detected BOOLEAN,
    proof_url TEXT,
    address TEXT,
    province TEXT,
    district TEXT,
    subdistrict TEXT,
    postalcode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into patients (user_id, firstname) values (1, 'test1');

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users ON DELETE CASCADE,
    licenseNumber TEXT,
    email TEXT,
    title TEXT,
    firstname TEXT,
    lastname TEXT,
    birthday DATE,
    tel TEXT,
    gender TEXT,
    address TEXT,
    province TEXT,
    district TEXT,
    subDistrict TEXT,
    postalCode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into doctors (user_id, firstname) values (1, 'testdoctor1');

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users ON DELETE CASCADE,
    hospital_name TEXT,
    hospital_number TEXT,
    bed_total INT,
    bed_occupied INT,
    tel TEXT,
    address TEXT,
    province TEXT,
    district TEXT,
    subdistrict TEXT,
    postalCode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into hospitals (user_id, hospital_name) values (1, 'testhospital1');

CREATE TABLE symtom (
    patient_id INT PRIMARY KEY REFERENCES patients ON DELETE CASCADE,
    fever BOOLEAN,
    cough BOOLEAN,
    snot BOOLEAN,
    sore_throat BOOLEAN,
    smell BOOLEAN,
    taste BOOLEAN,
    conjunctivitis BOOLEAN,
    rash BOOLEAN,
    liquid_stool BOOLEAN,
    liquid_stool_frequenly BOOLEAN,
    angina BOOLEAN,
    tired BOOLEAN,
    dizzy BOOLEAN,
    pneumonia BOOLEAN,
    complication BOOLEAN,
    sore_breath BOOLEAN,
    slow_response BOOLEAN,
    unconscious BOOLEAN,
    onset_date DATE,
    diabetes_obesity BOOLEAN,
    complications BOOLEAN,
    cardiovascular BOOLEAN,
    heart_failure BOOLEAN,
    lung_disease BOOLEAN,
    asthma BOOLEAN,
    chronic_lung BOOLEAN,
    malignant_tumors BOOLEAN,
    cancer BOOLEAN,
    chronic_kidney BOOLEAN,
    ckd34 BOOLEAN,
    kidney_failure_transplant BOOLEAN,
    rheumatoid_arthritis BOOLEAN,
    immunosuppressants BOOLEAN,
    chronic_liver BOOLEAN,
    respire_rate INT,
    pulse INT,
    o2_flowrate INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into symtom (patient_id, fever, cough) values (1, true, true);

CREATE TABLE appointments(
    id SERIAL PRIMARY KEY,
    startTime TIMESTAMPTZ,
    endTime TIMESTAMPTZ,
    url TEXT,
    status INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into appointments (url, status) values ('link.eiei', 1);

CREATE TABLE patient_doctor_appointment(
    id SERIAL PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_id INT REFERENCES appointments,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into patient_doctor_appointment (patient_id, doctor_id, appointment_id) values (1, 1, 1);

CREATE TABLE reservation(
    id SERIAL PRIMARY KEY,
    status INT,
    checkIn TIMESTAMPTZ,
    checkOut TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into reservation (status) values (1);

CREATE TABLE patient_hospital_reservation(
    id SERIAL PRIMARY KEY,
    patient_id INT,
    hospital_id INT,
    reservation_id INT REFERENCES reservation,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
insert into patient_hospital_reservation (patient_id, hospital_id, reservation_id) values (1, 1, 1);