from pydantic import BaseModel
from datetime import datetime

class PaymentCreate(BaseModel):
    amount: float
    payment_date: datetime
    payment_method: str
    status: str
    sale_id: int | None = None
    booking_id: int | None = None

class PaymentOut(PaymentCreate):
    id: int

    class Config:
        from_attributes = True