from pydantic import BaseModel, EmailStr

class EmployeeCreate(BaseModel):
    name: str
    role: str
    email: EmailStr

class EmployeeOut(BaseModel):
    id: int
    name: str
    role: str
    email: EmailStr

    class Config:
        from_attributes = True
