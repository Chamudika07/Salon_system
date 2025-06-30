from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    price: float
    quantity: int

class ProductOut(BaseModel):
    id: int
    name: str
    price: float
    quantity: int

    class Config:
        from_attributes = True  # For Pydantic v2