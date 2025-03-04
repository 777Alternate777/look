// Подключение к Appwrite
const client = new Appwrite.Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1") // Твой endpoint
    .setProject("67c5f7c100327cf444d4"); // Твой project ID

const databases = new Appwrite.Databases(client);
const storage = new Appwrite.Storage(client);
const databaseId = "67c612a50017aa7ec1cd"; // ID базы данных
const collectionId = "67c612be003cad091ef8"; // ID коллекции

async function uploadProfile() {
    let file = document.getElementById("photoInput").files[0];
    let name = document.getElementById("nameInput").value.trim();
    let desc = document.getElementById("descInput").value.trim();
    let price = document.getElementById("priceInput").value.trim();

    if (!file  !name  !desc || price) {
        alert("Заполните все поля!");
        return;
    }

    try {
        // Загружаем фото в хранилище
        const uploadResponse = await storage.createFile("default", "unique()", file);
        const fileId = uploadResponse.$id;

        // Получаем URL загруженного фото
        const fileUrl = https://cloud.appwrite.io/v1/storage/buckets/default/files/${fileId}/view?project=67c5f7c100327cf444d4;

        // Добавляем анкету в базу данных
        await databases.createDocument(databaseId, collectionId, "unique()", {
            name: name,
            description: desc,
            price: parseInt(price),
            image: fileUrl
        });

        alert("Анкета успешно добавлена!");
        window.location.href = "index.html"; // Перенаправляем на главную страницу
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        alert("Ошибка при загрузке анкеты.");
    }
}

// Добавляем функцию closeForm
function closeForm() {
    window.location.href = "index.html";
}

// Назначаем обработчики кнопкам
document.getElementById("saveBtn").addEventListener("click", uploadProfile);
document.getElementById("closeBtn").addEventListener("click", closeForm);
