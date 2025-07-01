from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.employee import EmployeeCreate, EmployeeOut
from app.crud.employee import (
    create_employee, get_employee, get_employees, update_employee, delete_employee
)
from app.db.dependency import get_db
from app.core.deps import get_current_active_user , get_current_admin_user
router = APIRouter()

#employee create api
@router.post("/", response_model=EmployeeOut)
def create(employee: EmployeeCreate, db: Session = Depends(get_db) , current_user = Depends(get_current_admin_user)):
    return create_employee(db, employee)

#employees get api
@router.get("/", response_model=list[EmployeeOut])
def list_employees(skip: int = 0, limit: int = 10, db: Session = Depends(get_db) , current_user = Depends(get_current_admin_user)):
    return get_employees(db, skip=skip, limit=limit)

#employee get using id api
@router.get("/{employee_id}", response_model=EmployeeOut)
def read_employee(employee_id: int, db: Session = Depends(get_db) , current_user = Depends(get_current_admin_user)):
    employee = get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

#employee update with id api
@router.put("/{employee_id}", response_model=EmployeeOut)
def update(employee_id: int, employee: EmployeeCreate, db: Session = Depends(get_db) , current_user = Depends(get_current_admin_user)):
    updated = update_employee(db, employee_id, employee)
    if not updated:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated

#employee delet with id api
@router.delete("/{employee_id}")
def delete(employee_id: int, db: Session = Depends(get_db) , current_user = Depends(get_current_admin_user)):
    deleted = delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"ok": True}