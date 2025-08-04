# 📝 **Conime Article Management Guide**

## 🚀 **Cara Update Artikel**

### 1. **Edit Artikel Existing**

Untuk mengubah artikel yang sudah ada, edit file `/src/data/mockData.ts`:

```typescript
// Cari artikel berdasarkan ID
{
  id: 1, // ID artikel yang ingin diubah
  title: {
    id: "Judul Baru Bahasa Indonesia",
    en: "New English Title"
  },
  excerpt: {
    id: "Excerpt bahasa Indonesia...",
    en: "English excerpt..."
  },
  summary: {
    id: "Summary untuk SEO bahasa Indonesia",
    en: "SEO summary in English"
  },
  content: {
    id: `
      <p>Konten artikel dalam HTML...</p>
      
      <!-- Untuk menambah quote staff di tengah artikel -->
      <div class="quote-highlight">
        <p class="quote-content">"Quote dari staff atau penulis manga"</p>
        <p class="quote-author">Nama Staff, Posisi</p>
      </div>
      
      <p>Lanjutan artikel...</p>
    `,
    en: `English version...`
  },
  // Update field lainnya...
}
```

### 2. **Tambah Artikel Baru**

Tambahkan object baru di array `mockNewsData`:

```typescript
{
  id: 8, // ID baru yang unik
  title: {
    id: "Judul Artikel Baru",
    en: "New Article Title"
  },
  excerpt: {
    id: "Ringkasan artikel...",
    en: "Article summary..."
  },
  summary: {
    id: "Meta description untuk SEO",
    en: "SEO meta description"
  },
  content: {
    id: `
      <p>Konten artikel lengkap dengan HTML tags...</p>
      
      <h3>Heading dalam Artikel</h3>
      <p>Paragraf dengan spacing yang baik untuk readability.</p>
      
      <!-- Gambar dengan caption -->
      <figure class="content-image">
        <img src="URL_GAMBAR" alt="Deskripsi gambar" />
        <figcaption>Caption gambar. Sumber: Nama Sumber</figcaption>
      </figure>
      
      <!-- Quote dari staff/penulis -->
      <div class="quote-highlight">
        <p class="quote-content">"Statement penting dari staff atau creator"</p>
        <p class="quote-author">Nama, Jabatan</p>
      </div>
      
      <p>Paragraf selanjutnya...</p>
      
      <h3>Sub heading lain</h3>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    `,
    en: `English content...`
  },
  relatedArticles: [
    {
      id: 1,
      title: { id: "Artikel Terkait 1", en: "Related Article 1" },
      slug: "artikel-terkait-1"
    }
  ],
  youtubeVideoId: "VIDEO_ID", // Optional
  additionalImages: [ // Optional
    {
      url: "https://example.com/image.jpg",
      caption: { 
        id: "Caption bahasa Indonesia", 
        en: "English caption" 
      }
    }
  ],
  category: "berita", // berita, ulasan, rekomendasi, anime, komik, movie, game
  author: "Koni",
  date: "15 Jan 2025",
  dateISO: "2025-01-15T10:00:00+07:00",
  image: "https://images.unsplash.com/photo-example",
  comments: 0,
  likes: 0,
  slug: "judul-artikel-baru",
  keywords: "keyword1, keyword2, keyword3",
  metaDescription: {
    id: "Meta description bahasa Indonesia untuk SEO",
    en: "English meta description for SEO"
  }
}
```

## 🎨 **Content Styling Guide**

### **Heading Structure**
```html
<h2>Main Section</h2>
<h3>Sub Section</h3>
<h4>Minor Section</h4>
```

### **Paragraf dengan Spacing Optimal**
```html
<p>Setiap paragraf akan memiliki margin-bottom 1.5rem untuk readability yang optimal. Line-height 1.8 memberikan spacing yang nyaman untuk mata.</p>

<p>Paragraf berikutnya akan memiliki jarak yang cukup untuk memisahkan ide-ide yang berbeda.</p>
```

### **Staff/Creator Quote (Mid-Article)**
```html
<div class="quote-highlight">
  <p class="quote-content">"Quote atau statement dari staff, creator, atau penulis manga. Ini akan muncul dengan styling khusus di tengah artikel."</p>
  <p class="quote-author">Nama Staff, Posisi/Jabatan</p>
</div>
```

### **Images with Caption**
```html
<figure class="content-image">
  <img src="URL_GAMBAR" alt="Alt text deskriptif" />
  <figcaption>Caption yang menjelaskan gambar. Sumber: Nama Sumber</figcaption>
</figure>
```

### **YouTube Embed** 
```html
<!-- Hanya perlu set youtubeVideoId di metadata, embed otomatis -->
youtubeVideoId: "dQw4w9WgXcQ"
```

### **Lists**
```html
<ul>
  <li><strong>Bold Point:</strong> Penjelasan detail poin</li>
  <li><strong>Another Point:</strong> Penjelasan lainnya</li>
</ul>
```

## 📊 **SEO Best Practices**

### **Required Fields untuk SEO**
```typescript
{
  title: { id: "Judul SEO Friendly", en: "SEO Friendly Title" },
  summary: { id: "Summary singkat", en: "Brief summary" },
  metaDescription: { id: "Meta desc ID", en: "Meta desc EN" },
  keywords: "keyword1, keyword2, keyword3",
  slug: "url-friendly-slug",
  dateISO: "2025-01-15T10:00:00+07:00" // ISO format
}
```

### **Image Optimization**
- Gunakan Unsplash URLs dengan parameter `?w=800&h=450&fit=crop`
- Alt text yang deskriptif
- Caption yang informatif

## 🔄 **Update Process**

### **Step by Step:**

1. **Edit mockData.ts**
   - Cari artikel yang ingin diupdate
   - Ubah content sesuai kebutuhan
   - Pastikan HTML valid

2. **Test Preview**
   - Refresh browser
   - Check artikel di SinglePage
   - Verify responsive design

3. **SEO Check**
   - Pastikan title, meta description, keywords filled
   - Test social sharing preview

## 📱 **Content Guidelines**

### **Writing Style**
- Paragraf pendek (3-5 kalimat)
- Subheading setiap 2-3 paragraf
- Quote untuk highlight penting
- Lists untuk informasi terstruktur

### **Technical**
- HTML tags harus valid
- Image sources harus accessible
- YouTube video IDs valid
- Slugs harus unique dan URL-friendly

## 🚨 **Common Issues & Solutions**

### **Spacing Terlalu Rapat**
- Gunakan `<p>` tags untuk setiap paragraf
- Hindari `<br>` manual
- CSS sudah handle spacing otomatis

### **Quote Tidak Muncul Styling**
- Pastikan gunakan class `quote-highlight`
- Structure: `quote-content` dan `quote-author`

### **Image Tidak Load**
- Check URL accessibility
- Gunakan HTTPS URLs
- Test image URL di browser

## 💡 **Pro Tips**

1. **Content Structure**: Opening → Body with quotes/images → Conclusion
2. **Engagement**: Gunakan staff quotes untuk credibility
3. **Visual**: Balance text dengan images dan quotes
4. **SEO**: Keywords natural, tidak force
5. **Readability**: Test di mobile dan desktop

---

**Happy Writing! 🎌✨**

Untuk pertanyaan lebih lanjut, check dokumentasi atau contact developer.