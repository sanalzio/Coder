# Coder

**Coder**, hafif ve özelleştirilebilir bir kod düzenleyici ve vurgulayıcıdır.

- [Coder](#coder)
- [Coder Nedir?](#coder-nedir)
- [Nasıl Çalışır?](#nasıl-çalışır)
- [Nasıl Kurulur?](#nasıl-kurulur)
  - [Dosyalarla Kurulum](#dosyalarla-kurulum)
  - [CDN ile Alım](#cdn-ile-alım)
- [Nasıl Kullanılır?](#nasıl-kullanılır)
  - [Satır Göstergesini Etkinleştirme/Devre Dışı Bırakma](#satır-göstergesini-etkinleştirme-devre-dışı-bırakma)
  - [Sekme Uzunluğunu Ayarlama](#sekme-uzunluğunu-ayarlama)
  - [Coder Stillerini Değiştirme](#coder-stillerini-değiştirme)
    - [Coder Metin Alanı Stilini Değiştirme](#coder-metin-alanı-stilini-değiştirme)
    - [Coder Satır Gösterge Stilini Değiştirme](#coder-satır-gösterge-stilini-değiştirme)
    - [Coder Ekran Bölgesi Stilini Değiştirme](#coder-ekran-bölgesi-stilini-değiştirme)
- [Lisans](#lisans)

## Coder Nedir?

**Coder**, kodunuzu vurgulamak ve düzenlemek için kullanılan bir araçtır. Hafif yapısı ve özelleştirilebilir stili sayesinde, kodunuzu daha okunabilir ve düzenli hale getirebilirsiniz.

## Nasıl Çalışır?

**Coder**, [highlight.js](https://highlightjs.org/) kütüphanesini temel alır. Kodunuzu vurgulamak için bu kütüphaneyi kullanır ve özelleştirilebilir bir arayüz ile size kolay bir kullanım sağlar.

## Nasıl Kurulur?

### Dosyalarla Kurulum

Coder'ı kullanmak için aşağıdaki adımları izleyin:

1. Bu depodan [index.min.js](https://rawcdn.githack.com/sanalzio/coder/master/index.min.js) ve [index.min.css](https://rawcdn.githack.com/sanalzio/coder/master/index.min.css) dosyalarını indirin.
2. HTML dosyanıza aşağıdaki script ve stylesheet etiketlerini ekleyin:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script type="module" src="path/to/index.min.js" defer></script>
    <link rel="stylesheet" href="path/to/index.min.css">
</head>
<body>
    <coder lang="xml" lines></coder>
    <script type="module">
        import xml from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/xml.min.js";
        import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js";
        import { coderInit } from "path/to/index.min.js";
        hljs.registerLanguage("xml", xml);
        coderInit(hljs);
    </script>
</body>
</html>