from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.customer import CustomerCreate, CustomerOut
from app.crud.customer import (
    get_customer, get_customers, update_customer, delete_customer, create_customer as crud_create_customer
)
from app.db.dependency import get_db
from app.core.deps import get_current_user , get_current_active_user

router = APIRouter()

def admin_required(current_user=Depends(get_current_active_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can perform this action"
        )
    return current_user

def admin_or_employee_required(current_user=Depends(get_current_active_user)):
    if current_user.role not in ["admin", "employee"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins or employees can perform this action"
        )
    return current_user

#customer create api
@router.post("/", response_model=CustomerOut)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return crud_create_customer(db, customer)

#customers get api 
@router.get("/", response_model=list[CustomerOut])
def list_customers(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(admin_or_employee_required)
):
    return get_customers(db, skip=skip, limit=limit)

#customers get using id api
@router.get("/{customer_id}", response_model=CustomerOut)
def read_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_or_employee_required)
):
    customer = get_customer(db, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

#customers update api
@router.put("/{customer_id}", response_model=CustomerOut)
def update(customer_id: int, customer: CustomerCreate, db: Session = Depends(get_db)):
    updated = update_customer(db, customer_id, customer)
    if not updated:
        raise HTTPException(status_code=404, detail="Customer not found")
    return updated

#customers delet api
@router.delete("/{customer_id}")
def delete(customer_id: int, db: Session = Depends(get_db)):
    deleted = delete_customer(db, customer_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"ok": True}