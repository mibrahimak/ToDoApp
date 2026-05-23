Persona Task Management System

Persona Task Management, modern frontend teknolojileri kullanılarak geliştirilmiş, kullanıcı bazlı görev takibi ve yönetimi sağlayan dinamik bir web uygulamasıdır. Bu proje, bir staj programı kapsamında, API entegrasyonu, state yönetimi ve modern UI/UX prensiplerini uygulamak amacıyla geliştirilmiştir.

🚀 Özellikler
  *  Dinamik Görev Yönetimi: Görev ekleme, durum güncelleme (Yapılıyor/Tamamlandı) ve silme işlemleri.
    
  *  Gelişmiş Filtreleme: Kullanıcı bazlı ve görev durumuna göre (Tamamlananlar/Bekleyenler) anlık filtreleme.
    
  *  Persist Veri Yapısı: Local Storage entegrasyonu sayesinde sayfa yenilense dahi verilerin korunması ve sistemi manuel sıfırlama seçeneği.
    
  *  Detaylı Analiz: Her görevin içeriğini ve o göreve ait yorumları (comments) API üzerinden anlık çeken detay modalı.
    
  *  Responsive Tasarım: Tailwind CSS ve Custom CSS ile tüm cihazlarla uyumlu, modern ve kullanıcı dostu arayüz.

🛠️ Kullanılan Teknolojiler
  * Frontend: React.js
  
  * Stil Yönetimi: Tailwind CSS (v4) & CSS
  
  * Paket Yönetimi & Build: Vite
  
  * API: JSONPlaceholder (REST API simülasyonu)
  
  * Tasarım: Figma (UI/UX mimarisi bu araç üzerinde kurgulanmıştır)

🏗️ Proje Yapısı
Proje, sürdürülebilir ve modüler bir mimari üzerine kurulmuştur:

  ```bash
  src/
  │
  ├── components/
  │   ├── TaskCard.jsx
  │   ├── TaskList.jsx
  │   ├── TaskModal.jsx
  │   ├── CreateTaskForm.jsx
  │   ├── Navbar.jsx
  │   └── FilterBar.jsx
  │
  ├── pages/
  │   └── Dashboard.jsx
  │
  ├── services/
  │   └── api.js
  │
  ├── hooks/
  │   └── useTasks.js
  │
  └── App.jsx
```

  
⚙️ Kurulum ve Çalıştırma Adımları
Bu projeyi yerel bilgisayarınızda test etmek veya çalıştırmak için aşağıdaki adımları sırasıyla takip edebilirsiniz:

1. Depoyu Klonlayın veya İndirin
Projeyi GitHub üzerinden bilgisayarınıza indirmek için terminale aşağıdaki komutu yazın:
   ```bash
   git clone https://github.com/mibrahimak/ToDoApp.git
    ```
   (Alternatif olarak projeyi GitHub üzerinden .zip olarak indirip bir klasöre de çıkartabilirsiniz.)

2. Proje Klasörüne Giriş Yapın
   ```bash
    cd ToDoApp
   ``` 

4. Bağımlılıkları (Paketleri) Yükleyin
   ```bash
   npm install
   ```

5. Tailwind CSS ve PostCSS Paketlerini Kontrol Edin
   ```bash
   npm install -D tailwindcss @tailwindcss/vite
   ```

6. Projeyi Lokal Sunucuda Başlatın
   ```bash
   npm run dev
   ```

👨‍💻 Hazırlayan

Mustafa İbrahim AK    
Software Developer & Student

Bu proje, mobil ve frontend uygulama geliştirme süreçlerindeki teknik yetkinlikleri artırmak amacıyla gerçekleştirilen bir "Software Persona Yazılım Stajı" kapsamında geliştirilmiştir. Proje süresince bileşen mimarisi, custom hook yapıları ve modern arayüz tasarımı konularına odaklanılmıştır.

🛠️ Geliştirici Yetkinlikleri & Kazanımlar
*   Modern Frontend Stack: React.js, Tailwind CSS v4 ve Custom CSS ile modüler, performanslı ve responsive UI geliştirme.
*   State & Veri Yönetimi: Custom Hooks (`useTasks`) mimarisi ile asenkron veri çekme süreçleri, hata yönetimi (`loading/error state`) ve veri filtreleme optimizasyonları.
*   Yerel Veri Saklama (Persistence): Tarayıcı hafızasını dinamik yönetmek adına Local Storage entegrasyonu ve senkronizasyonu.
*   UI/UX Prototipleme: Tasarım aşamasında Figma bileşen mantığı ve arayüz mimarisinin analizi.

🌐 İletişim & Bağlantılar
*   GitHub: [mibrahimak](https://github.com/mibrahimak)
*   LinkedIn: [mustafaibrahimdev](https://linkedin.com/in/mustafaibrahimdev)
