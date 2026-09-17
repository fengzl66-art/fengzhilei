export interface Product {
  id: string;
  pu: string;
  sku: string;
  skuQuantity: string;
  priority: number;
  diversion: string;
  interaction: string;
  group: string;
  algoRecommended: boolean;
  selectedConstraints: Constraint[];
}

export interface Constraint {
  id: string;
  combination: '且' | '或';
  attribute: string;
  condition: string;
  attributeValue: string;
  dataType: string;
}
