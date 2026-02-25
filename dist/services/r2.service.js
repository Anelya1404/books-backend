"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdf = uploadPdf;
const client_s3_1 = require("@aws-sdk/client-s3");
const client = new client_s3_1.S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
    },
});
const bucket = process.env.R2_BUCKET ?? "";
async function uploadPdf(key, buffer) {
    await client.send(new client_s3_1.PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: "application/pdf",
    }));
}
//# sourceMappingURL=r2.service.js.map