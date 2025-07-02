from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.sale import SaleCreate, SaleOut
from app.crud.sale import create_sale, get_sale, get_sales
from app.db.dependency import get_db
from app.core.deps import get_current_admin_user

router = APIRouter()

#create sale API
@router.post("/", response_model=SaleOut)
def create(sale: SaleCreate, db: Session = Depends(get_db), current_user=Depends(get_current_admin_user)):
    return create_sale(db, sale)

#get sales API
@router.get("/", response_model=list[SaleOut])
def list_sales(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user=Depends(get_current_admin_user)):
    return get_sales(db, skip=skip, limit=limit)

#get with id Sale API
@router.get("/{sale_id}", response_model=SaleOut)
def read_sale(sale_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_admin_user)):
    sale = get_sale(db, sale_id)
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return sale