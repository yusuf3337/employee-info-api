# Employee Info API

Bu kılavuz `GET /admin/developer/api-reference` üzerinden Markdown olarak sunulur. Bu uç ve aşağıdaki personel, maaş, transfer uçları yalnızca **admin JWT** ile erişilebilir. `Authorization: Bearer <token>` başlığını kullanın. Token, `POST /login` yanıtındaki `accessToken` alanıdır.

İstek ve yanıt gövdeleri JSON'dur; kılavuz yanıtı `text/markdown` türündedir. `:id` pozitif tam sayıdır. Olmayan kayıt `404`, geçersiz veri `400`, tekrar eden benzersiz alan veya ilişkili kayıt nedeniyle silinememe `409` döndürür. `PUT` tüm düzenlenebilir alanları yeniden gönderir.

## Personel

| Method / URL | Amaç | Controller → Action → Query | Başarılı yanıt |
| --- | --- | --- | --- |
| `GET /employees` | Tüm personeli listele | `employees/getEmployees` → `employees/fetchEmployees` → `selectEmployees` | `200 {"employees": [...]}` |
| `GET /employees/:id` | Personel detayı | `employees/getEmployee` → `employees/fetchEmployee` → `selectEmployee` | `200 {"employee": {...}}` |
| `POST /employees` | Personel oluştur | `employees/postEmployee` → `employees/createEmployee` → `insertEmployee` | `201 {"employee": {...}}` |
| `PUT /employees/:id` | Personeli düzenle | `employees/putEmployee` → `employees/modifyEmployee` → `updateEmployee` | `200 {"employee": {...}}` |
| `DELETE /employees/:id` | Personeli sil | `employees/deleteEmployee` → `employees/removeEmployee` → `deleteEmployee` | `200 {"deleted": true}` |

Controller yolları `src/app/controllers/`, Action yolları `src/actions/` köküne göredir. Her Query, ilgili Action'ın `queries/` klasöründedir.

`POST` ve `PUT` örnek gövdesi:

```json
{
  "firstName": "Ayşe",
  "lastName": "Yılmaz",
  "email": "ayse.yilmaz@example.com",
  "phone": "+90 555 111 2233",
  "department": "Muhasebe",
  "jobTitle": "Uzman",
  "hireDate": "2026-10-27",
  "status": "active"
}
```

`phone` ve `department` isteğe bağlıdır. `status` değeri `active` veya `inactive` olabilir. Personelin maaş kaydı varsa silme isteği `409` döndürür.

## Maaş

| Method / URL | Amaç | Controller → Action → Query | Başarılı yanıt |
| --- | --- | --- | --- |
| `GET /salaries` | Tüm maaş kayıtları | `salaries/getSalaries` → `salaries/fetchSalaries` → `selectSalaries` | `200 {"salaries": [...]}` |
| `GET /salaries?employeeId=1` | Personelin maaşları | Aynı liste akışı | `200 {"salaries": [...]}` |
| `GET /salaries/:id` | Maaş detayı | `salaries/getSalary` → `salaries/fetchSalary` → `selectSalary` | `200 {"salary": {...}}` |
| `POST /salaries` | Maaş kaydı oluştur | `salaries/postSalary` → `salaries/createSalary` → `insertSalary` | `201 {"salary": {...}}` |
| `PUT /salaries/:id` | Maaş kaydını düzenle | `salaries/putSalary` → `salaries/modifySalary` → `updateSalary` | `200 {"salary": {...}}` |
| `DELETE /salaries/:id` | Maaş kaydını sil | `salaries/deleteSalary` → `salaries/removeSalary` → `deleteSalary` | `200 {"deleted": true}` |

`POST` ve `PUT` örnek gövdesi:

```json
{
  "employeeId": 1,
  "grossAmount": "45000.00",
  "currency": "TRY",
  "effectiveDate": "2026-10-01",
  "notes": "Aylık brüt maaş"
}
```

`grossAmount` pozitif ondalık metindir; en fazla iki basamak kabul edilir. `notes` isteğe bağlıdır. İlişkili transfer kaydı varsa maaş silinemez (`409`).

## Ödeme transfer kayıtları

| Method / URL | Amaç | Controller → Action → Query | Başarılı yanıt |
| --- | --- | --- | --- |
| `GET /transfers` | Tüm transfer kayıtları | `transfers/getTransfers` → `transfers/fetchTransfers` → `selectTransfers` | `200 {"transfers": [...]}` |
| `GET /transfers?employeeId=1` | Personelin transferleri | Aynı liste akışı | `200 {"transfers": [...]}` |
| `GET /transfers/:id` | Transfer detayı | `transfers/getTransfer` → `transfers/fetchTransfer` → `selectTransfer` | `200 {"transfer": {...}}` |
| `POST /transfers` | Transfer kaydı oluştur | `transfers/postTransfer` → `transfers/createTransfer` → `insertTransfer` | `201 {"transfer": {...}}` |
| `PUT /transfers/:id` | Transfer kaydını düzenle | `transfers/putTransfer` → `transfers/modifyTransfer` → `updateTransfer` | `200 {"transfer": {...}}` |
| `DELETE /transfers/:id` | Transfer kaydını sil | `transfers/deleteTransfer` → `transfers/removeTransfer` → `deleteTransfer` | `200 {"deleted": true}` |

`POST` ve `PUT` örnek gövdesi:

```json
{
  "salaryId": 1,
  "amount": "45000.00",
  "currency": "TRY",
  "transferDate": "2026-10-31",
  "reference": "MAAS-2026-10-001",
  "status": "completed",
  "notes": "Banka transfer kaydı"
}
```

`reference` benzersizdir; `status` değeri `pending`, `completed` veya `failed` olabilir. Bu API banka transferi başlatmaz, gerçekleşen veya planlanan ödemeyi kaydeder.

## Geliştirici kılavuzu

| Method / URL | Erişim | Controller | Action / Query | Yanıt |
| --- | --- | --- | --- | --- |
| `GET /admin/developer/api-reference` | Admin JWT | `admin/getApiReference` | `admin/fetchApiReference`; SQL sorgusu yok, kökteki `API.md` okunur | `200 text/markdown` |

## Giriş ve hesap işlemleri

Bu uçlar personel CRUD işlemlerinden ayrıdır. Yönetim paneli giriş, parola kurtarma ve kullanıcı hesabı oluşturma/güncelleme için kullanır.

| Method / URL | Erişim | Controller → Action → Query | İstek / başarılı yanıt |
| --- | --- | --- | --- |
| `POST /login` | Açık | `users/login` → `users/fetchUser` → `selectUser` | `{"email":"yonetici@example.com","password":"ornek-sifre"}` → `200 {"accessToken":"..."}` |
| `GET /user-types` | Açık | `users/userTypes` → `users/fetchUserTypes` → `selectUserTypes` | `200 {"userTypes":[{"userTypeId":1,"userType":"admin"}, ...]}` |
| `POST /register` | Admin JWT | `users/register` → `users/createUser` → `insertUser` | `{"firstName":"Deniz","lastName":"Kaya","email":"deniz@example.com","password":"guclu-sifre","userTypeId":2}` → `201 {"user":4}` |
| `PUT /edit/user` | JWT | `users/putUserDetails` → `users/modifyUser` → `updateUserDetails` | `{"firstName":"Deniz","lastName":"Kaya","password":"yeni-guclu-sifre"}` → `200 {"userDetails":{...},"accessToken":"..."}` |
| `POST /recovery-request` | Açık | `password-recovery/postRecoveryRequest` → `password-recovery/createRecoveryRequest` → `insertRecoveryRequest` | `{"requestedEmail":"deniz@example.com"}` → `200 {"requestId":1}` |
| `PUT /update-password/:shortcode` | Kurtarma kodu | `password-recovery/putPassword` → `fetchRecoveryRequest`, `modifyPassword`, `modifyRecoveryDate` → ilgili `select`/`update` sorguları | `{"email":"deniz@example.com","password":"yeni-guclu-sifre","confirmPassword":"yeni-guclu-sifre"}` → `200 {"userId":4}` |
| `GET /healthcheck` | Açık | `platform/healthcheck` → `getMySQLVersion` | `200 {"mysqlVersion":"...","appVersion":"1.0.0"}` |

Kurtarma e-postası gönderilemezse `POST /recovery-request` `502` döndürür; başarılı yanıt yalnızca e-posta servisi gönderimi kabul ettiğinde verilir.
