export function convertToDollars(priceCents,quantity=1,deleiveryCostCents=0){
  return (((priceCents/100)*(quantity))+(deleiveryCostCents/100)).toFixed(2);
}