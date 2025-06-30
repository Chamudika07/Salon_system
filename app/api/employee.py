from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.employee import EmployeeCreate, EmployeeOut
from app.crud.employee import create_employee
from app.db.dependency import get_db

router = APIRouter()

@router.post("/", response_model=EmployeeOut)
def create(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(db, employee)