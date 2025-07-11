from pydantic import BaseModel, field_validator
from datetime import datetime
import pytz

class BookingCreate(BaseModel):
    employee_id: int
    customer_id: int
    date: datetime
    status: str = "Scheduled"

    @field_validator('date')
    @classmethod
    def validate_date(cls, v):
        # Ensure the datetime is timezone-aware, if not, assume UTC
        if v.tzinfo is None:
            # If no timezone info, assume it's UTC
            v = v.replace(tzinfo=pytz.UTC)
        return v

class BookingOut(BaseModel):
    id: int
    employee_id: int
    customer_id: int
    date: datetime
    status: str
    customer_name: str
    employee_name: str

    class Config:
        from_attributes = True  # For Pydantic v2