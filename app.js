const { Address, beginCell, toNano } = TonWeb.utils;

async function generateJettonPayload(recipient, sender) {
    const payloadCell = beginCell()
      .storeUint(0xf8a7ea5, 32)  // Opcode Jetton transfer
      .storeUint(0, 64)          // Query ID
      .storeCoins(toNano(10))    // Кількість Jetton
      .storeAddress(new Address(recipient)) // Адреса отримувача
      .storeAddress(new Address(sender))    // Адреса відправника
      .storeBit(0)              // Немає додаткового payload
      .storeCoins(toNano(0.05)) // Forward amount
      .endCell();

    return payloadCell.toBoc().toString('base64'); // Повертає payload у форматі base64
}

// Виклик функції для прикладу
const recipient = "0:123..."; // заміни на справжню адресу
const sender = "0:abc...";
generateJettonPayload(recipient, sender).then(payload => console.log("Generated Payload:", payload));
