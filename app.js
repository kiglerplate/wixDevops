const express = require("express");
const app = express();
const port = 8080;

const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true });
require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
var admin = require("firebase-admin");

app.get("/", (req, res) => {
  res.send("Hello from My App! This is running on Google Kubernetes Engine");
});

admin.initializeApp({
  credential: admin.credential.cert({
    private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5B7z+iDN7+m/f\n5lsAODM+PvTiqFoZQieLz+NgBJK5gUUhWxk7KhOLaFQ6Vq+zq9xS3IcQ1VBOWYJq\np0f3hTF1EIj+Dsoq3shw4sOdPxNGTpam93d4JzQvSAMGPx9ahrR5z0F3Fw2XOyIi\nn2PQWod1yhcI+1JZav40DxVjiZK+BXgyDndF7RuULzUEjfhmi3wWcEYEB9jt1QvA\n1atEQNGSROwgL/Jfx1kjhVt8aVaIbccQhMuNmgs8JHHn8aEKvfX4BdGDLAMelR9e\nT2KxlEcGoUmycaqa+3RbY6i+c8GT6iVp5vnLyoFBqdTB4r51bx/rNgF4ZdtjlsIC\nGTvE5QffAgMBAAECggEAG/9IQSlhxO4xlGr6NQ/L7SzAiDVaIL1KV5T2vjYi72/Y\ngoIS0Ml+mJcKO6OXRXQJS/5zb4AffSN9IN87+/+K6sA8QlkBjTgVk0M0vyvmojpN\nAGmsiaFA+7CFSKIvf9anI1FRghAabdo0QZHlnAa+vXt9Pc4teTs/yKfJoDyWWCsg\nt1VJPiB2cAspPkX/0ZUW4SUNCTsx2MUhdKNtcO4SRRyK12Osi4LjZwLw/fqTIWr7\nROZf4F6WNWZufyxAXwwumitcQFFHzmF2Y9Yvz/k3/w1/gERlXFPzfEhX+xZN6Bif\nJBIU1hri4dvbeAXq+sokM4ONhUZ9c78n7cpiFLgMiQKBgQDnLqMjlDdhO2tOSHb6\n7zMOYA4cp3OvuUYJuEJGMvNImEdIyYK6z8YLhJLIdY8DJhBQt1ECtjq+l3wg4y3F\n6XKyj+bi12wsBo9zqArR1ahbE+Njpn+PF0j3HS812owxevDAyN/XE5O8gOoDhpg0\n7GrZW2AVkT1w64EpvxTKuNpidwKBgQDM5MAT1CfK1G6gBxCZLvyd05vDqrdsSbcO\nEcuAu45g60FDW6vqQMdjYtByMQIG+GpGX4/mdVawGRUArYpw53qKZ0HJDZOdbj07\nVEHQCdwLvvgFXfOWrLkXBS7GhYP3c+VXV4nDxy5kSWkiE3yKuvQqvdhmHkYZEQae\nAdMzpGA32QKBgQCpgA1HAd4U4U8M556s34KssIrIQZJVrd8HM10MQUEU4emqGW1L\ncRmAymQgq+j+YwMlWzL/bQLnSQROzKJ78G0TNOURPudl5C17nCLKtP+qP4vCPYpb\nLLRn0rMRpjqR8NTiVKWh+Q2h8Vci3KVucETrNs7dIU9OIq3iIOKqvBwKgwKBgQDC\ndfi22QxLPQMhbpMaT7YCNOwI8OXVKMFL4Se7rkabRaxTOZYYZhLXCNm9BzZdVzfG\nQrxYhdUYnTWJxys1rPxoj0eogfIv4IjM3lL4F+N4Ym8S6PBfeN7SMmEKmX1+RcjM\n9JAT997X37SgWs5A/N7wEe5oPSNadwZIwIKq6L9JQQKBgQDP2Q4558MPdxPeuBHG\nWcAEZhVT5hkvriPY5kItQhx06RFVbVFo/tR/5+pVMSYbic+ZwA7wnmd4c00xoqWP\nlCgvwLSNk5Y+8DA4+VbOx6JoVO4tXTaD9AaB17nObh6UgyEoHiNvZ7JUMDaBtEYq\n4SAhvsVPGllnSTBLFA26yEIUGA==\n-----END PRIVATE KEY-----\n`,
    client_email: `firebase-adminsdk-fbsvc@wixapp-8efb6.iam.gserviceaccount.com`,
    project_id: "wixapp-8efb6",
  }),
});
const db = admin.firestore();

app.use(cors);
app.use(cookieParser);
app.use(express.json());

app.use(cors);
app.use(cookieParser);
app.use(express.json());

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvRLCmgoSCQ0UpcCcdq7o
oHqtY0/Pa5IpnNLU6D1rvDIUdFx4Ifs2uud9bAbBcnuFo+cyHRrZBFgw7UEeBxUD
a+l+qrCMEsj4wNeVgVGJpThrNB4xfXKa881AWhDxfGA3dznONmDkTn+q+ICw/a78
+25fi60mGpzf+j6VSL6gUjib5eBChUKLjnbT93TYx1zs6Nxw7T9cUQEiFNNBSEpw
Y2LFRt5R8/79YlXwUTbrQlM1ya4338gMRECIyVTkv1VKDo4lwVPYvH/qbHm7Z15P
pnGmsNITNeElduqxUYura5VRIdOEVpBudMwqobjKX2Owdvk8LkicDriGQnKC0ac/
EwIDAQAB
-----END PUBLIC KEY-----`;

const WHATSAPP_API_URL =
  "https://api.smartsend.co.il/whatsapp/api/Action/send-message";
const WHATSAPP_TOKEN = "1FOWDZS5HZPOMKLG";

const clients = {}; // מפתח = clientId, ערך = client instance

// 📌 יצירת לקוח וואטסאפ חדש
const createWhatsAppClient = async (clientId) => {
  if (clients[clientId]) {
    console.log(`📌 לקוח ${clientId} כבר מחובר`);
    return clients[clientId];
  }

  console.log(`🔄 יצירת חיבור ללקוח ${clientId}...`);

  const client = new Client({
    authStrategy: new LocalAuth({ clientId }),
  });

  client.on("qr", async (qr) => {
    console.log(`📲 QR קוד נוצר עבור ${clientId}, מחכה לסריקה...`);
    const qrDataURL = await qrcode.toDataURL(qr);

    // עדכון QR בפיירבייס
    await db.collection("whatsapp-settings").doc(clientId).set(
      {
        clientId,
        qr: qrDataURL,
        isReady: false,
        timestamp: new Date().toISOString(),
      },
      { merge: true }
    );
  });

  client.on("ready", async () => {
    console.log(`✅ וואטסאפ מחובר עבור ${clientId}!`);

    // עדכון סטטוס התחברות בפיירבייס
    await db.collection("whatsapp-settings").doc(clientId).set(
      {
        isReady: true,
        timestamp: new Date().toISOString(),
      },
      { merge: true }
    );
  });

  client.on("state_changed", async (state) => {
    console.log(`📡 שינוי מצב עבור ${clientId}:`, state);

    if (state === "DISCONNECTED") {
      console.log(`⚠️ וואטסאפ נותק עבור ${clientId}, מייצר QR חדש...`);

      // מחיקת הלקוח מהזיכרון
      delete clients[clientId];

      // יצירת לקוח חדש ו-QR מיידית
      await createWhatsAppClient(clientId);
    }
  });

  // client.on("disconnected", async () => {
  //   console.log(`⚠️ וואטסאפ נותק עבור ${clientId}`);

  //   // עדכון סטטוס בפיירבייס
  //   await db.collection("whatsapp-settings").doc(clientId).set(
  //     {
  //       isReady: false,
  //       timestamp: new Date().toISOString(),
  //     },
  //     { merge: true }
  //   );

  //   delete clients[clientId]; // מחיקה מהזיכרון
  // });

  client.initialize();
  clients[clientId] = client;
  return client;
};

// 📌 טעינה מחדש של כל הלקוחות ששמורים בפיירבייס לאחר הפעלת השרת
const reloadClients = async () => {
  const snapshot = await db.collection("whatsapp-settings").get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.isReady) {
      createWhatsAppClient(data.clientId);
    }
  });
};

reloadClients();

app.post("/whatsapp/register", async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: "חובה לספק מספר טלפון" });
  }

  const clientId = `client-${phoneNumber}`;

  console.log(`📌 יצירת לקוח חדש עבור ${clientId}`);

  // יצירת לקוח חדש
  await createWhatsAppClient(clientId);

  return res.json({ success: true, clientId });
});

app.get("/whatsapp/qr/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  const doc = await db.collection("whatsapp-settings").doc(clientId).get();

  if (!doc.exists) {
    return res.status(404).json({ error: "לקוח לא נמצא" });
  }

  const data = doc.data();
  if (data.isReady) {
    return res.json({ status: "CONNECTED" });
  } else {
    return res.json({ status: "QR_REQUIRED", qr: data.qr });
  }
});

// 📌 API לשליחת הודעות לפי `clientId`
app.post("/whatsapp/send/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const { number, message } = req.body;

  if (!clients[clientId]) {
    return res.status(400).json({ error: `לקוח ${clientId} לא מחובר` });
  }

  try {
    await clients[clientId].sendMessage(`${number}@c.us`, message);
    console.log(`📩 הודעה נשלחה ל-${number} דרך ${clientId}`);
    res.json({ success: true });
  } catch (error) {
    console.error(`❌ שגיאה בשליחת הודעה:`, error);
    res.status(500).json({ error: "שגיאה בשליחת ההודעה" });
  }
});

setInterval(async () => {
  const snapshot = await db.collection("whatsapp-settings").get();
  snapshot.forEach(async (doc) => {
    const data = doc.data();
    if (!data.isReady) {
      console.log(`🔄 מנסה לחבר מחדש את ${data.clientId}...`);
      await createWhatsAppClient(data.clientId);
    }
  });
}, 5 * 60 * 1000); // כל 5 דקות

app.post("/webhook", express.text(), async (request, response) => {
  console.log("🔍 Headers:", request.headers);

  console.log("Received");
  let event;
  let eventData;

  try {
    const rawPayload = jwt.verify(request.body, PUBLIC_KEY);
    event = JSON.parse(rawPayload.data);
    eventData = JSON.parse(event.data);
  } catch (err) {
    console.error(err);
    response.status(400).send(`Webhook error: ${err.message}`);
    return;
  }

  switch (event.eventType) {
    case "wix.ecom.v1.order_created":
    // console.log(
    //   `wix.ecom.v1.order_created event received with data:`,
    //   eventData
    // );
    //
    // handle your event here
    //
    case "wix.ecom.v1.order_updated":
      // console.log(
      //   `wix.ecom.v1.order_updated event received with data:`,
      //   eventData
      // );

      if (eventData?.updatedEvent?.currentEntity) {
        const order = eventData.updatedEvent.currentEntity;

        // 🛒 פרטי הלקוח (Buyer Info)
        if (order.buyerInfo) {
          console.log(
            "📞 Buyer Info:",
            JSON.stringify(order.buyerInfo, null, 2)
          );
        } else {
          console.log("⚠️ No Buyer Info Found");
        }

        if (order.shippingInfo) {
          console.log(
            "📞 Buyer Info:",
            JSON.stringify(order.shippingInfo, null, 2)
          );
        } else {
          console.log("⚠️ No Buyer Info Found");
        }

        // 📦 פרטי מקבל המשלוח (Recipient Info)
        if (
          order.recipientInfo?.contactDetails &&
          order.shippingInfo?.logistics?.pickupDetails
        ) {
          console.log(
            "📦 Recipient Info:",
            JSON.stringify(order.recipientInfo.contactDetails, null, 2)
          );

          if (order.fulfillmentStatus === "FULFILLED") {
            const customerPhone = order.recipientInfo.contactDetails?.phone;
            const customerName =
              order.recipientInfo.contactDetails?.firstName || "לקוח יקר";
            const orderId = order.number || "XXXXX";

            if (!customerPhone) {
              console.error("❌ לא נמצא מספר טלפון של הלקוח!");
              return res.status(400).send("Missing customer phone number");
            }

            const formattedPhone = customerPhone.replace(/\D/g, "");

            const message = `שלום ${customerName},\n\nהלוחית שלך מוכנה לאיסוף!\nאנא הגיע לנקודת החלוקה שלך.\n\nמספר ההזמנה: ${orderId}`;

            console.log(`📤 שולח הודעה ל-${formattedPhone}: ${message}`);

            try {
              const response = await axios.post(
                WHATSAPP_API_URL,
                {
                  phone: formattedPhone,
                  message: message,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    token: WHATSAPP_TOKEN,
                  },
                }
              );

              console.log("✅ הודעה נשלחה בהצלחה:", response.data);
            } catch (error) {
              console.error(
                "❌ שגיאה בשליחת ההודעה:",
                error.response ? error.response.data : error.message
              );
            }
          }
        } else {
          console.log("⚠️ No Recipient Info Found");
        }
      } else {
        console.log("⚠️ No `currentEntity` found in updatedEvent");
      }

      break;

    default:
      console.log(`Received unknown event type: ${event.eventType}`);
      break;
  }

  response.status(200).send();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
