from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.payment import PaymentCreate, PaymentOut
from app.crud.payment import create_payment, get_payment, get_payments
from app.db.dependency import get_db
from app.core.deps import get_current_admin_user, get_current_active_user
from app.crud.booking import get_booking
from app.crud.sale import get_sale
from app.crud.customer import get_customer

router = APIRouter()

#create Payment API
def admin_or_owner_create_payment(payment: PaymentCreate, db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    if current_user.role == "admin":
        return current_user
    # Check booking ownership
    if payment.booking_id:
        booking = get_booking(db, payment.booking_id)
        if booking:
            customer_id_value = int(booking.__dict__["customer_id"])
            customer = get_customer(db, customer_id_value)
            if customer and current_user.email == customer.email:
                return current_user
    # Check sale ownership
    if payment.sale_id:
        sale = get_sale(db, payment.sale_id)
        if sale:
            customer_id_value = int(sale.__dict__["customer_id"])
            customer = get_customer(db, customer_id_value)
            if customer and current_user.email == customer.email:
                return current_user
    raise HTTPException(status_code=403, detail="Not enough permissions")

@router.post("/", response_model=PaymentOut)
def create(payment: PaymentCreate, db: Session = Depends(get_db), current_user=Depends(admin_or_owner_create_payment)):
    return create_payment(db, payment)

#get payment API
@router.get("/", response_model=list[PaymentOut])
def list_payments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user=Depends(get_current_admin_user)):
    return get_payments(db, skip=skip, limit=limit)

#get with id payment
@router.get("/{payment_id}", response_model=PaymentOut)
def read_payment(payment_id: int, db: Session = Depends(get_db) , current_user=Depends(get_current_admin_user)):
    payment = get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment