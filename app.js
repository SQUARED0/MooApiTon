const express = require('express');
const TonWeb = require('tonweb');

// Ініціалізуй TonWeb
const { Address, beginCell, toNano } = TonWeb.utils;

// Створи сервер
const app = express();

// Middlewares
app.use(express.json());

// Маршрут для генерації Jetton payload
app.post('/generate-payload', async (req, res) => {
  try {
    const { recipient, sender } = req.body; // Отримуємо адреси з тіла запиту

    // Перевірка, що адреси не порожні
    if (!recipient || !sender) {
      return res.status(400).json({ error: "Recipient and sender addresses are required" });
    }

    // Генерація payload
    const payloadCell = beginCell()
      .storeUint(0xf8a7ea5, 32)  // Opcode Jetton transfer
      .storeUint(0, 64)          // Query ID
      .storeCoins(toNano(10))    // Кількість Jetton
      .storeAddress(new Address(recipient)) // Адреса отримувача
      .storeAddress(new Address(sender))    // Адреса відправника
      .storeBit(0)              // Немає додаткового payload
      .storeCoins(toNano(0.05)) // Forward amount
      .endCell();

    const payloadBase64 = payloadCell.toBoc().toString('base64'); // Згенерований payload

    // Повертаємо payload у відповідь
    res.json({ payload: payloadBase64 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
