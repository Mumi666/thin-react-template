# 个人摄影作品集

这是一个使用 Vite 构建的个人摄影作品集站点，静态输出通过 Nginx 提供。

## 本地开发

```bash
npm install
npm run dev
```

## 构建镜像

```bash
docker build -t photo-portfolio .
```

## Docker 运行（带照片目录挂载）

站点会从容器内 `/usr/share/nginx/html/photos` 读取照片。

```bash
docker run -d \
  --name photo-portfolio \
  -p 8080:80 \
  -v /path/to/your/photos:/usr/share/nginx/html/photos \
  photo-portfolio
```

将照片放入挂载目录后，使用 `/photos/xxx.jpg` 的路径即可在页面中展示。

## 动态照片清单（index.json）

纯静态站点无法直接读取目录列表。推荐在挂载目录里放一个 `index.json`，页面会自动读取并渲染。

示例：`/path/to/your/photos/index.json`

```json
{
  "hero": {
    "cover": "cover.jpg",
    "updateCount": "18"
  },
  "featured": [
    {"title": "海岸线", "location": "福建 · 平潭", "year": "2024", "url": "featured-01.jpg"},
    {"title": "霓虹夜", "location": "上海 · 外滩", "year": "2023", "url": "featured-02.jpg"}
  ],
  "series": [
    {"name": "城市漫游", "description": "夜色与光影之间的行走记录。", "cover": "series-city.jpg"},
    "series-portrait.jpg"
  ],
  "aboutNotes": [
    {"title": "拍摄方向", "detail": "日常街景、人物情绪、旅行中的光线。"}
  ]
}
```

`featured`/`series` 支持对象或字符串：字符串会自动拼接 `/photos/` 作为路径。

## 自动生成 index.json（按文件夹 + 时间排序）

当你按文件夹管理照片时，可以用脚本自动生成 `index.json`：

目录结构示例：

```
/path/to/your/photos
  cover.jpg
  featured/
    a.jpg
    b.jpg
  series/
    city/
      01.jpg
    portrait/
      02.jpg
```

生成命令：

```bash
python3 scripts/generate-index.py --root /path/to/your/photos
```

规则：
- `featured/` 按文件修改时间倒序生成 `featured`
- `series/` 的每个子文件夹生成一个系列，封面取该文件夹最新照片
- `cover.jpg` 或 `cover.jpeg` 作为首页封面，没有则使用 `featured` 第一张
