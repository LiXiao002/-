export interface ReceiptData {
  orderNo: string;
  stallName: string;
  items: { name: string; count: number; price: number }[];
  totalAmount: number;
  time: string;
  pickupMethod: string;
}

export function generateReceiptContent(data: ReceiptData): string {
  const line = "--------------------------------";
  const header = "      智慧营养食堂 - 结账单      ";
  
  let itemsContent = "";
  data.items.forEach(item => {
    const name = item.name.padEnd(12);
    const count = `x${item.count}`.padEnd(6);
    const price = `¥${(item.price * item.count).toFixed(2)}`.padStart(10);
    itemsContent += `${name}${count}${price}\n`;
  });

  return `
${header}
${line}
取餐编号: ${data.orderNo}
取餐档口: ${data.stallName}
取餐方式: ${data.pickupMethod}
下单时间: ${data.time}
${line}
项目        数量          金额
${itemsContent}
${line}
合计金额: ¥${data.totalAmount.toFixed(2)}
${line}
请留意大屏叫号，凭此券取餐
祝您用餐愉快！
`;
}
