#!/usr/bin/env node
// 上传本地图片到自建图床，输出 Markdown 链接
// 用法：IMGBED_AUTH_CODE=xxx pnpm upload-img a.png b.jpg
import { readFile } from "node:fs/promises";
import { basename } from "node:path";

const BASE = process.env.IMGBED_URL || "https://img.leileigwl.cn";
const UPLOAD = process.env.IMGBED_UPLOAD_URL || "https://leileigwl-img.pages.dev";
const AUTH = process.env.IMGBED_AUTH_CODE;

if (!AUTH) {
	console.error("缺少环境变量 IMGBED_AUTH_CODE（图床上传认证码）");
	process.exit(1);
}
const files = process.argv.slice(2);
if (!files.length) {
	console.error("用法：pnpm upload-img <图片路径...>");
	process.exit(1);
}

for (const f of files) {
	const form = new FormData();
	form.append("file", new Blob([await readFile(f)]), basename(f));
	const res = await fetch(`${UPLOAD}/upload?authCode=${encodeURIComponent(AUTH)}`, {
		method: "POST",
		body: form,
	});
	if (!res.ok) {
		console.error(`${f} 上传失败：${res.status} ${await res.text()}`);
		continue;
	}
	const data = await res.json();
	const src = Array.isArray(data) ? data[0]?.src : data?.src;
	const alt = basename(f).replace(/\.[^.]+$/, "");
	console.log(`![${alt}](${BASE}${src})`);
}
