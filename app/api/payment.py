from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.payment import PaymentCreate, PaymentOut
from app.crud.payment import create_payment, get_payment, get_payments
from app.db.dependency import get_db

router = APIRouter()

#create Payment API
@router.post("/", response_model=PaymentOut)
def create(payment: PaymentCreate, db: Session = Depends(get_db)):
    return create_payment(db, payment)

#get payment API
@router.get("/", response_model=list[PaymentOut])
def list_payments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_payments(db, skip=skip, limit=limit)

#get with id payment
@router.get("/{payment_id}", response_model=PaymentOut)
def read_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment