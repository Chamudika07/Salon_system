from pydantic import BaseModel
from datetime import date, time

class EmployeeAvailabilityCreate(BaseModel):
    employee_id: int
    available_date: date
    start_time: time
    end_time: time

class EmployeeAvailabilityOut(EmployeeAvailabilityCreate):
    id: int

    class Config:
        from_attributes = True