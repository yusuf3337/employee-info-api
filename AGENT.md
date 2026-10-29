# Living API — Xest backend kuralları

Bu dosya bu repoda çalışan kod ajanları için geçerlidir. Yeni API özellikleri ve CRUD değişikliklerinde aşağıdaki Xest düzenini uygula. Mevcut kodu yalnızca isimlendirmeye uydurmak için topluca yeniden adlandırma; kapsam dışı davranışı değiştirme.

## Katmanlar ve sorumlulukları

İstek akışı: **Request → Router → Controller → Action → Query → Database**. Yanıt, Controller üzerinden client'a döner.

| Katman | Konum | Sorumluluk |
| --- | --- | --- |
| Router | `src/app/routes.js` | HTTP methodu, URL, middleware ve ilgili Controller'ı bağlar. |
| Controller | `src/app/controllers/<resource>/<operation>/index.js` | Request'i doğrular, gerekli Action'ları çağırır, doğru HTTP statusu ve response'u döndürür, hatayı uygun şekilde işler. |
| Action | `src/actions/<resource>/<operation>/index.js` | İş akışını ve veritabanı işlemlerini organize eder; birden fazla Controller tarafından yeniden kullanılabilir. |
| Query | Genellikle ilgili Action'ın `queries/` dizini | SQL'i `submitQuery` ve mevcut database helper'larıyla çalıştırır. Gerekirse başka katmanlardan da kullanılabilir. |

Controller içinde SQL yazma. Router'a iş mantığı koyma. Query dosyasına HTTP request/response davranışı koyma. Bir özellik için mevcut kodda farklı bir yerleşim varsa önce onu incele; yeni kodda aynı sorumluluk ayrımını koru.

## CRUD adlandırması

| İşlem | HTTP / Controller öneki | Action öneki | Query öneki |
| --- | --- | --- | --- |
| Create | `POST` / `post` | `create` | `insert` |
| Read | `GET` / `get` | `fetch` | `select` |
| Update | `PUT` / `put` | `modify` | `update` |
| Delete | `DELETE` / `delete` | `remove` | `delete` |

Örnek bir kullanıcı oluşturma akışı:

```text
src/app/routes.js
  → src/app/controllers/users/postUser/index.js
  → src/actions/users/createUser/index.js
  → src/actions/users/createUser/queries/insertUser.js
```

Okuma için `getUser → fetchUser → selectUser`, güncelleme için `putUser → modifyUser → updateUser`, silme için `deleteUser → removeUser → deleteUser` biçimini kullan. İsimleri kaynak ve işleme göre anlamlı şekilde özelleştir (ör. `fetchUserById`, `selectUserById`).

## Uygulama notları

- Request doğrulamasını Controller katmanında, gerekiyorsa Controller'a yakın `schemas/` altında tut.
- Action'ları yeniden kullanılabilir yap; Controller'a veya Express `req`/`res` nesnelerine bağımlı kılma.
- SQL ve database helper çağrılarını Query katmanında tut. Action, ilgili Query'leri çağırıp sonucu işler.
- Yeni route eklerken gerekli authentication/authorisation middleware'lerini mevcut route örneklerine göre uygula.
- Veritabanı şeması değişecekse yalnızca `database/database-schema.sql` dosyasını güncelle. Bu projede yeni migration dosyası oluşturma; veritabanını otomatik sıfırlama veya canlı veritabanında elle SQL çalıştırma.
- Bu projede kullanıcı ayrıca istemedikçe yeni test dosyası yazma. Lint ve ilgili statik kontrolleri çalıştır; mevcut projedeki biçimlendirme ve hata işleme yaklaşımını koru.

## Developer API kılavuzu

- Route'ları `src/app/routes.js` içinde doğrudan Express `router.get/post/put/delete` ile kaydet; route içine doküman metadata'sı yazma.
- Her yeni endpoint'i ve değişen method/URL/request/response bilgisini aynı değişiklikte kökteki `API.md` dosyasına elle ekle veya güncelle.
- Türkçe açıklama, erişim düzeyi, ilgili Controller/Action/Query yolu ve hassas veri içermeyen örnekler kullan.
- Kılavuz `GET /admin/developer/api-reference` ile yalnızca adminlere Markdown olarak sunulur. FE, aynı dosyayı bu uçtan görüntüler; ayrı endpoint listesi tutmaz.