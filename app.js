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

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://example.com");
  console.log(await page.title());

  await browser.close();
})();

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

// אובייקטים לשמירת מופעים ואתרי Wix (אם נדרש)
const clients = {}; // מפתח = instanceId, ערך = client instance
const wixSites = {}; // שמירה של אתרי Wix לפי instanceId

// פונקציה ליצירת מופע WhatsApp
const createWhatsAppClient = async (instanceId) => {
  if (!instanceId) {
    console.log("⚠️ instanceId חסר, לא ניתן להמשיך.");
    return;
  }

  // אם מופע קיים כבר, נחזיר אותו
  if (clients[instanceId]) {
    console.log(`⚠️ מופע כבר קיים עבור ${instanceId}, מחזיר מופע קיים.`);
    return clients[instanceId];
  }

  console.log(`🔄 יצירת חיבור ל-WhatsApp עבור ${instanceId}...`);

  // שימוש ב-LocalAuth עם מזהה ייחודי - הנתונים ישמרו בתיקיות .wwebjs_auth ו-.wwebjs_cache
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: instanceId }),
    // אפשר להוסיף הגדרות Puppeteer במידת הצורך:
    // puppeteer: { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  });

  // אירוע QR - כאשר נוצר קוד, נשמור את הקוד במסד הנתונים
  client.on("qr", async (qr) => {
    console.log(`📲 QR קוד נוצר עבור ${instanceId}, מחכה לסריקה...`);
    const qrDataURL = await qrcode.toDataURL(qr);

    // עדכון מסמך במסד Firestore
    await db.collection("whatsapp-settings").doc(instanceId).set(
      {
        instanceId,
        qr: qrDataURL,
        isReady: false,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  });

  // אירוע כאשר המופע מוכן (מחובר)
  client.on("ready", async () => {
    console.log(`✅ וואטסאפ מחובר עבור ${instanceId}!`);
    await db.collection("whatsapp-settings").doc(instanceId).set(
      {
        isReady: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  });

  // אירוע שינוי מצב - אם המופע מתנתק, ננסה להתחבר מחדש
  client.on("state_changed", async (state) => {
    console.log(`📡 שינוי מצב עבור ${instanceId}: ${state}`);

    // לדוגמה: במצב "DISCONNECTED" ננקה את המופע וננסה להתחבר מחדש
    if (state === "DISCONNECTED") {
      console.log(`⚠️ וואטסאפ נותק עבור ${instanceId}, מנסה יצירת QR חדש...`);
      delete clients[instanceId];
      await createWhatsAppClient(instanceId);
    }
  });

  client.initialize();
  clients[instanceId] = client;
  return client;
};

// API לרישום מופע חדש
app.post("/whatsapp/register", async (req, res) => {
  const { instanceId } = req.body;

  if (!instanceId) {
    return res.status(400).json({ error: "חובה לספק instanceId" });
  }

  if (clients[instanceId]) {
    return res.status(400).json({ error: "כבר קיים מופע פעיל עבור instanceId זה." });
  }

  console.log(`📌 יצירת מופע חדש עבור ${instanceId}`);
  await createWhatsAppClient(instanceId);
  return res.json({ success: true, instanceId });
});

// API לשליפת QR (או סטטוס התחברות)
app.get("/whatsapp/qr/:instanceId", async (req, res) => {
  const instanceId = req.params.instanceId;
  const doc = await db.collection("whatsapp-settings").doc(instanceId).get();

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

// API לשליחת הודעות דרך מופע קיים
app.post("/whatsapp/send", async (req, res) => {
  const { clientId, number, message } = req.body;
  if (!clients[clientId]) {
    return res.status(400).json({ error: `לקוח ${clientId} לא מחובר` });
  }
  try {
    await clients[clientId].sendMessage(`${number}@c.us`, message);
    console.log(`📩 הודעה נשלחה ל-${number} דרך ${clientId}`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ שגיאה בשליחת הודעה:", error);
    res.status(500).json({ error: "שגיאה בשליחת ההודעה" });
  }
});

// API לקבלת Webhooks (לדוגמה מאתר Wix)
app.post("/webhook", express.text(), async (req, res) => {
  console.log("🔍 Headers:", req.headers);
  console.log("Received Webhook");

  let instanceId;
  let event;
  let eventData;

  try {
    // אימות JWT וקבלת payload
    const rawPayload = jwt.verify(req.body, PUBLIC_KEY);
    console.log("🔐 Decoded JWT:", rawPayload);

    instanceId = rawPayload.instanceId || "Unknown";
    console.log(`🆔 Wix Site Instance ID: ${instanceId}`);

    // ניתן לעדכן/להוסיף את האתר לטבלת wixSites
    if (!wixSites[instanceId]) {
      wixSites[instanceId] = `Wix Site ${instanceId}`;
      console.log(`🆕 New Wix Site detected: ${instanceId}`);
    }

    event = JSON.parse(rawPayload.data);
    eventData = JSON.parse(event.data);
  } catch (err) {
    console.error("⚠️ JWT Verification Error:", err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // טיפול לפי סוג האירוע (לדוגמה, order_created או order_updated)
  switch (event.eventType) {
    case "wix.ecom.v1.order_created":
      console.log(`📦 Order Created from ${wixSites[instanceId]}:`, eventData);
      // עדכון מסד הנתונים או טיפול נוסף
      break;
    case "wix.ecom.v1.order_updated":
      console.log(`🔄 Order Updated from ${wixSites[instanceId]}:`, eventData);
      // לדוגמה, שליחת הודעה ללקוח במקרה שההזמנה הושלמה:
      if (eventData?.updatedEvent?.currentEntity) {
        const order = eventData.updatedEvent.currentEntity;
        if (order.fulfillmentStatus === "FULFILLED") {
          const customerPhone = order.recipientInfo?.contactDetails?.phone;
          if (!customerPhone) {
            console.error("❌ לא נמצא מספר טלפון של הלקוח!");
            return res.status(400).send("Missing customer phone number");
          }
          const formattedPhone = customerPhone.replace(/\D/g, "");
          const message = `שלום, ההזמנה ${order.number || "N/A"} הושלמה!`;
          // אפשר להשתמש גם במופע WhatsApp כדי לשלוח הודעה
          try {
            // נניח ש־instanceId זהה למופע WhatsApp שלך:
            await clients[instanceId].sendMessage(`${formattedPhone}@c.us`, message);
            console.log(`📤 הודעה נשלחה ל-${formattedPhone}`);
          } catch (error) {
            console.error("❌ שגיאה בשליחת הודעה:", error);
          }
        }
      }
      break;
    default:
      console.log(`⚠️ Unknown event type received: ${event.eventType}`);
      break;
  }
  res.status(200).send();
});

const reloadClients = async () => {
  try {
    const snapshot = await db.collection("whatsapp-settings").get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      // נניח שברצונך לנסות ליצור מופע מחדש אם הוא היה במצב פעיל
      if (data.isReady) {
        console.log(`🔄 טוען מופע מחדש עבור ${data.instanceId}...`);
        createWhatsAppClient(data.instanceId);
      }
    });
  } catch (error) {
    console.error("❌ שגיאה בטעינת מופעים:", error);
  }
};

// קריאה לפונקציה בעת אתחול השרת
reloadClients();


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
