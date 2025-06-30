from pydantic import BaseModel
from datetime import datetime

class BookingCreate(BaseModel):
    employee_id: int
    customer_id: int
    date: datetime
    status: str = "Scheduled"

class BookingOut(BaseModel):
    id: int
    employee_id: int
    customer_id: int
    date: datetime
    status: str

    class Config:
        from_attributes = True  # For Pydantic v2