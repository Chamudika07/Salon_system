from pydantic import BaseModel
from datetime import datetime

class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int
    price: float

class SaleCreate(BaseModel):
    customer_id: int
    date: datetime
    total: float
    items: list[SaleItemCreate]

class SaleItemOut(SaleItemCreate):
    id: int
    sale_id: int

    class Config:
        from_attributes = True

class SaleOut(BaseModel):
    id: int
    customer_id: int
    date: datetime
    total: float
    items: list[SaleItemOut]

    class Config:
        from_attributes = True