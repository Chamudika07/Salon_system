from pydantic import BaseModel, EmailStr

class CustomerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    address: str | None = None

class CustomerOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str | None = None
    address: str | None = None

    class Config:
        from_attributes = True  # For Pydantic v2