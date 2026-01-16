import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  status: 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
  cancellationReason?: string;
  refundAmount?: number;
}

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    placed: '#f59e0b',
    confirmed: '#3b82f6',
    shipped: '#8b5cf6',
    out_for_delivery: '#06b6d4',
    delivered: '#10b981',
    cancelled: '#ef4444',
    refunded: '#6b7280',
  };
  return colors[status] || '#6b7280';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    placed: 'Order Placed',
    confirmed: 'Order Confirmed',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  return texts[status] || status;
};

const baseEmailTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #232f3e 0%, #37475a 100%); padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: #febd69; font-size: 28px; font-weight: bold;">iShop.in</h1>
        <p style="margin: 8px 0 0; color: #ffffff; font-size: 14px;">Your Trusted Shopping Destination</p>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 32px 24px;">
        ${content}
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">Need help? Contact us at support@ishop.in</p>
        <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">Phone: 1800-123-4567 (Toll Free)</p>
        <div style="margin-top: 16px;">
          <a href="#" style="color: #007185; text-decoration: none; font-size: 12px; margin: 0 8px;">Terms</a>
          <a href="#" style="color: #007185; text-decoration: none; font-size: 12px; margin: 0 8px;">Privacy</a>
          <a href="#" style="color: #007185; text-decoration: none; font-size: 12px; margin: 0 8px;">Help</a>
        </div>
        <p style="margin: 16px 0 0; color: #9ca3af; font-size: 11px;">© 2024 iShop.in. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const itemsTableHtml = (items: OrderItem[]) => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
  <tr style="background-color: #f9fafb;">
    <th style="padding: 12px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">Item</th>
    <th style="padding: 12px; text-align: center; font-size: 12px; color: #6b7280; text-transform: uppercase;">Qty</th>
    <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; text-transform: uppercase;">Price</th>
  </tr>
  ${items.map(item => `
  <tr style="border-top: 1px solid #e5e7eb;">
    <td style="padding: 12px;">
      <div style="display: flex; align-items: center;">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 12px; border-radius: 4px;">` : ''}
        <span style="font-size: 14px; color: #1f2937;">${item.name}</span>
      </div>
    </td>
    <td style="padding: 12px; text-align: center; font-size: 14px; color: #6b7280;">${item.quantity}</td>
    <td style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600; color: #1f2937;">${formatPrice(item.price * item.quantity)}</td>
  </tr>
  `).join('')}
</table>
`;

const priceBreakdownHtml = (order: OrderDetails) => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
  <tr>
    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal</td>
    <td style="padding: 8px 0; text-align: right; font-size: 14px;">${formatPrice(order.subtotal)}</td>
  </tr>
  <tr>
    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Shipping</td>
    <td style="padding: 8px 0; text-align: right; font-size: 14px;">${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</td>
  </tr>
  <tr>
    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">GST (18%)</td>
    <td style="padding: 8px 0; text-align: right; font-size: 14px;">${formatPrice(order.tax)}</td>
  </tr>
  <tr style="border-top: 2px solid #e5e7eb;">
    <td style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #1f2937;">Total</td>
    <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: bold; color: #1f2937;">${formatPrice(order.total)}</td>
  </tr>
</table>
`;

const statusTrackerHtml = (currentStatus: string) => {
  const statuses = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
  const currentIndex = statuses.indexOf(currentStatus);
  
  return `
  <div style="margin: 24px 0;">
    <div style="display: flex; justify-content: space-between; position: relative;">
      <div style="position: absolute; top: 12px; left: 5%; right: 5%; height: 4px; background-color: #e5e7eb; z-index: 0;"></div>
      <div style="position: absolute; top: 12px; left: 5%; width: ${currentIndex >= 0 ? (currentIndex / (statuses.length - 1)) * 90 : 0}%; height: 4px; background-color: #10b981; z-index: 1;"></div>
      ${statuses.map((status, idx) => `
        <div style="text-align: center; z-index: 2; flex: 1;">
          <div style="width: 28px; height: 28px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 12px; ${idx <= currentIndex ? 'background-color: #10b981; color: white;' : 'background-color: #e5e7eb; color: #9ca3af;'}">
            ${idx <= currentIndex ? '✓' : idx + 1}
          </div>
          <p style="margin: 8px 0 0; font-size: 10px; color: ${idx <= currentIndex ? '#10b981' : '#9ca3af'};">${getStatusText(status)}</p>
        </div>
      `).join('')}
    </div>
  </div>
  `;
};

export const generateOrderPlacedEmail = (order: OrderDetails) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 64px; height: 64px; background-color: #dcfce7; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">✓</span>
      </div>
      <h2 style="margin: 0; color: #10b981; font-size: 24px;">Order Placed Successfully!</h2>
      <p style="margin: 8px 0 0; color: #6b7280;">Thank you for shopping with iShop.in</p>
    </div>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order ID:</strong> <span style="color: #007185;">${order.orderId}</span></p>
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order Date:</strong> ${order.orderDate}</p>
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Payment:</strong> ${order.paymentMethod}</p>
      ${order.estimatedDelivery ? `<p style="margin: 0; font-size: 14px;"><strong>Expected Delivery:</strong> <span style="color: #10b981; font-weight: 600;">${order.estimatedDelivery}</span></p>` : ''}
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Delivery Address</h3>
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 14px;"><strong>${order.customerName}</strong></p>
      <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">${order.shippingAddress}</p>
      ${order.customerPhone ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Phone: ${order.customerPhone}</p>` : ''}
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Order Items</h3>
    ${itemsTableHtml(order.items)}
    ${priceBreakdownHtml(order)}

    <div style="margin-top: 24px; text-align: center;">
      <a href="#" style="display: inline-block; background-color: #febd69; color: #232f3e; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Track Your Order</a>
    </div>
  `;

  return {
    subject: `Order Confirmed! #${order.orderId} - iShop.in`,
    html: baseEmailTemplate(content, 'Order Confirmation'),
  };
};

export const generateOrderShippedEmail = (order: OrderDetails) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 64px; height: 64px; background-color: #ede9fe; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">📦</span>
      </div>
      <h2 style="margin: 0; color: #8b5cf6; font-size: 24px;">Your Order Has Been Shipped!</h2>
      <p style="margin: 8px 0 0; color: #6b7280;">Your package is on its way</p>
    </div>

    ${statusTrackerHtml('shipped')}

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order ID:</strong> <span style="color: #007185;">${order.orderId}</span></p>
      ${order.trackingNumber ? `<p style="margin: 0 0 8px; font-size: 14px;"><strong>Tracking Number:</strong> <span style="font-family: monospace; background: #e5e7eb; padding: 2px 8px; border-radius: 4px;">${order.trackingNumber}</span></p>` : ''}
      ${order.estimatedDelivery ? `<p style="margin: 0; font-size: 14px;"><strong>Expected Delivery:</strong> <span style="color: #10b981; font-weight: 600;">${order.estimatedDelivery}</span></p>` : ''}
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Shipping To</h3>
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 14px;"><strong>${order.customerName}</strong></p>
      <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">${order.shippingAddress}</p>
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Items in this shipment</h3>
    ${itemsTableHtml(order.items)}

    <div style="margin-top: 24px; text-align: center;">
      ${order.trackingUrl ? `<a href="${order.trackingUrl}" style="display: inline-block; background-color: #febd69; color: #232f3e; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Track Package</a>` : '<a href="#" style="display: inline-block; background-color: #febd69; color: #232f3e; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Order</a>'}
    </div>
  `;

  return {
    subject: `Shipped! Your order #${order.orderId} is on the way - iShop.in`,
    html: baseEmailTemplate(content, 'Order Shipped'),
  };
};

export const generateOutForDeliveryEmail = (order: OrderDetails) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 64px; height: 64px; background-color: #cffafe; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">🚚</span>
      </div>
      <h2 style="margin: 0; color: #06b6d4; font-size: 24px;">Out for Delivery!</h2>
      <p style="margin: 8px 0 0; color: #6b7280;">Your package will arrive today</p>
    </div>

    ${statusTrackerHtml('out_for_delivery')}

    <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
      <p style="margin: 0; font-size: 16px; color: #059669; font-weight: 600;">🎉 Arriving Today!</p>
      <p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;">Please keep your phone accessible for delivery updates</p>
    </div>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order ID:</strong> <span style="color: #007185;">${order.orderId}</span></p>
      <p style="margin: 0; font-size: 14px;"><strong>Delivering to:</strong> ${order.customerName}</p>
      <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">${order.shippingAddress}</p>
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Your Items</h3>
    ${itemsTableHtml(order.items)}
  `;

  return {
    subject: `Arriving Today! Order #${order.orderId} - iShop.in`,
    html: baseEmailTemplate(content, 'Out for Delivery'),
  };
};

export const generateOrderDeliveredEmail = (order: OrderDetails) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 64px; height: 64px; background-color: #dcfce7; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">🎉</span>
      </div>
      <h2 style="margin: 0; color: #10b981; font-size: 24px;">Order Delivered!</h2>
      <p style="margin: 8px 0 0; color: #6b7280;">Your package has been delivered</p>
    </div>

    ${statusTrackerHtml('delivered')}

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order ID:</strong> <span style="color: #007185;">${order.orderId}</span></p>
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Delivered to:</strong> ${order.customerName}</p>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">${order.shippingAddress}</p>
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Delivered Items</h3>
    ${itemsTableHtml(order.items)}
    ${priceBreakdownHtml(order)}

    <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
      <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #92400e;">⭐ How was your experience?</p>
      <p style="margin: 0 0 12px; font-size: 14px; color: #a16207;">Your feedback helps us improve!</p>
      <a href="#" style="display: inline-block; background-color: #febd69; color: #232f3e; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Write a Review</a>
    </div>

    <p style="text-align: center; color: #6b7280; font-size: 14px;">
      Not satisfied? You can <a href="#" style="color: #007185;">return this item</a> within 30 days.
    </p>
  `;

  return {
    subject: `Delivered! Order #${order.orderId} - iShop.in`,
    html: baseEmailTemplate(content, 'Order Delivered'),
  };
};

export const generateOrderCancelledEmail = (order: OrderDetails) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 64px; height: 64px; background-color: #fee2e2; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">❌</span>
      </div>
      <h2 style="margin: 0; color: #ef4444; font-size: 24px;">Order Cancelled</h2>
      <p style="margin: 8px 0 0; color: #6b7280;">Your order has been cancelled</p>
    </div>

    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order ID:</strong> ${order.orderId}</p>
      ${order.cancellationReason ? `<p style="margin: 0; font-size: 14px;"><strong>Reason:</strong> ${order.cancellationReason}</p>` : ''}
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Cancelled Items</h3>
    ${itemsTableHtml(order.items)}

    <div style="background-color: #ecfdf5; border-radius: 8px; padding: 16px; margin: 24px 0;">
      <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #059669;">💰 Refund Information</p>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">
        ${order.paymentMethod === 'COD' 
          ? 'Since this was a Cash on Delivery order, no refund is required.'
          : `Refund of <strong>${formatPrice(order.total)}</strong> will be credited to your original payment method within 5-7 business days.`
        }
      </p>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">Looking for something else?</p>
      <a href="#" style="display: inline-block; background-color: #febd69; color: #232f3e; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Continue Shopping</a>
    </div>
  `;

  return {
    subject: `Order Cancelled - #${order.orderId} - iShop.in`,
    html: baseEmailTemplate(content, 'Order Cancelled'),
  };
};

export const generateRefundEmail = (order: OrderDetails) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 64px; height: 64px; background-color: #dbeafe; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">💳</span>
      </div>
      <h2 style="margin: 0; color: #3b82f6; font-size: 24px;">Refund Processed</h2>
      <p style="margin: 8px 0 0; color: #6b7280;">Your refund has been initiated</p>
    </div>

    <div style="background-color: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
      <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">Refund Amount</p>
      <p style="margin: 0; font-size: 32px; font-weight: bold; color: #1e40af;">${formatPrice(order.refundAmount || order.total)}</p>
    </div>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Order ID:</strong> ${order.orderId}</p>
      <p style="margin: 0 0 8px; font-size: 14px;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p style="margin: 0; font-size: 14px;"><strong>Expected Credit:</strong> 5-7 business days</p>
    </div>

    <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Refunded Items</h3>
    ${itemsTableHtml(order.items)}

    <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 24px;">
      If you don't see the refund within 7 business days, please <a href="#" style="color: #007185;">contact support</a>.
    </p>
  `;

  return {
    subject: `Refund Processed - #${order.orderId} - iShop.in`,
    html: baseEmailTemplate(content, 'Refund Processed'),
  };
};

export async function sendOrderEmail(order: OrderDetails, type: 'placed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded') {
  let emailContent: { subject: string; html: string };

  switch (type) {
    case 'placed':
      emailContent = generateOrderPlacedEmail(order);
      break;
    case 'shipped':
      emailContent = generateOrderShippedEmail(order);
      break;
    case 'out_for_delivery':
      emailContent = generateOutForDeliveryEmail(order);
      break;
    case 'delivered':
      emailContent = generateOrderDeliveredEmail(order);
      break;
    case 'cancelled':
      emailContent = generateOrderCancelledEmail(order);
      break;
    case 'refunded':
      emailContent = generateRefundEmail(order);
      break;
    default:
      throw new Error('Invalid email type');
  }

  try {
    await transporter.sendMail({
      from: `"iShop.in" <${process.env.GMAIL_USER}>`,
      to: order.customerEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    });
    console.log(`Order ${type} email sent to ${order.customerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
