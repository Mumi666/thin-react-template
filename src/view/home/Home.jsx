import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const fallbackData = {
    featuredPhotos: [
        {
            title: "海岸线",
            location: "福建 · 平潭",
            year: "2024",
            url: "/photos/featured-01.jpg",
        },
        {
            title: "霓虹夜",
            location: "上海 · 外滩",
            year: "2023",
            url: "/photos/featured-02.jpg",
        },
        {
            title: "荒野风",
            location: "内蒙古 · 阿拉善",
            year: "2022",
            url: "/photos/featured-03.jpg",
        },
        {
            title: "午后光",
            location: "杭州 · 西湖",
            year: "2024",
            url: "/photos/featured-04.jpg",
        },
    ],
    series: [
        {
            name: "城市漫游",
            description: "夜色与光影之间的行走记录。",
            cover: "/photos/series-city.jpg",
        },
        {
            name: "人像情绪",
            description: "更贴近呼吸的自然人像。",
            cover: "/photos/series-portrait.jpg",
        },
        {
            name: "山海之间",
            description: "大地与天空的留白。",
            cover: "/photos/series-landscape.jpg",
        },
    ],
    aboutNotes: [
        {
            title: "拍摄方向",
            detail: "日常街景、人物情绪、旅行中的光线。",
        },
        {
            title: "设备偏好",
            detail: "定焦 + 低饱和色调，强调层次与呼吸感。",
        },
        {
            title: "更新频率",
            detail: "每月整理一次，持续追加新系列。",
        },
    ],
    hero: {
        cover: "/photos/cover.jpg",
        updateCount: "14",
    },
};

const toPhotoItem = (item, index) => {
    if (typeof item === "string") {
        const path = item.startsWith("/") ? item : `/photos/${item}`;
        return {title: `作品 ${index + 1}`, location: "", year: "", url: path};
    }
    const url = item.url?.startsWith("/") ? item.url : `/photos/${item.url}`;
    return {
        title: item.title || `作品 ${index + 1}`,
        location: item.location || "",
        year: item.year || "",
        url: item.url ? url : `/photos/featured-${String(index + 1).padStart(2, "0")}.jpg`,
    };
};

const toSeriesItem = (item, index) => {
    if (typeof item === "string") {
        const path = item.startsWith("/") ? item : `/photos/${item}`;
        return {name: `系列 ${index + 1}`, description: "", cover: path};
    }
    const cover = item.cover?.startsWith("/") ? item.cover : `/photos/${item.cover}`;
    return {
        name: item.name || `系列 ${index + 1}`,
        description: item.description || "",
        cover: item.cover ? cover : `/photos/series-${index + 1}.jpg`,
    };
};

const normalizeData = (payload) => {
    if (!payload || typeof payload !== "object") {
        return fallbackData;
    }
    const featured = Array.isArray(payload.featured)
        ? payload.featured.map(toPhotoItem)
        : fallbackData.featuredPhotos;
    const seriesItems = Array.isArray(payload.series)
        ? payload.series.map(toSeriesItem)
        : fallbackData.series;
    const about = Array.isArray(payload.aboutNotes) ? payload.aboutNotes : fallbackData.aboutNotes;
    const hero = {
        ...fallbackData.hero,
        ...(payload.hero || {}),
    };
    if (hero.cover && !hero.cover.startsWith("/")) {
        hero.cover = `/photos/${hero.cover}`;
    }
    return {
        featuredPhotos: featured,
        series: seriesItems,
        aboutNotes: about,
        hero,
    };
};

export function Home() {
    const [data, setData] = useState(fallbackData);

    useEffect(() => {
        fetch("/photos/index.json")
            .then((response) => (response.ok ? response.json() : null))
            .then((payload) => {
                if (payload) {
                    setData(normalizeData(payload));
                }
            })
            .catch(() => {});
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f3ef] text-[#1b1a18]">
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_#f3c5a5,_transparent_70%)] opacity-60 blur-3xl"/>
                <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_#9db7c8,_transparent_70%)] opacity-60 blur-3xl"/>
                <div className="pointer-events-none absolute bottom-[-160px] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_#d9d1c4,_transparent_70%)] opacity-60 blur-3xl"/>

                <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[#1b1a18] text-sm font-semibold text-[#f5f3ef]">
                            L
                        </div>
                        <div className="text-sm uppercase tracking-[0.3em] text-[#5d5a55]">Lumen Photos</div>
                    </div>
                    <nav className="hidden items-center gap-8 text-sm font-medium text-[#5d5a55] md:flex">
                        <a className="transition hover:text-[#1b1a18]" href="#gallery">作品</a>
                        <a className="transition hover:text-[#1b1a18]" href="#series">系列</a>
                        <a className="transition hover:text-[#1b1a18]" href="#about">关于</a>
                    </nav>
                    <Link
                        className="rounded-full border border-[#1b1a18]/20 px-4 py-2 text-sm font-medium transition hover:border-[#1b1a18] hover:bg-[#1b1a18] hover:text-[#f5f3ef]"
                        to="/about"
                    >
                        关于我
                    </Link>
                </header>

                <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-full border border-[#1b1a18]/15 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#5d5a55] shadow-sm">
                            个人摄影集
                        </div>
                        <div className="space-y-4">
                            <h1 className="font-display text-4xl leading-tight text-[#1b1a18] md:text-6xl">
                                以光为笔，记录城市与人。
                            </h1>
                            <p className="max-w-xl text-base text-[#5d5a55] md:text-lg">
                                这是我的个人摄影归档，记录城市里的情绪、人物的呼吸与空间的节奏。
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                className="rounded-full bg-[#1b1a18] px-6 py-3 text-sm font-semibold text-[#f5f3ef] shadow-lg shadow-[#1b1a18]/20 transition hover:-translate-y-0.5"
                                href="#gallery"
                            >
                                浏览作品
                            </a>
                            <a
                                className="rounded-full border border-[#1b1a18]/20 px-6 py-3 text-sm font-semibold text-[#1b1a18] transition hover:border-[#1b1a18] hover:bg-white"
                                href="#series"
                            >
                                进入系列
                            </a>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {data.aboutNotes.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-[#1b1a18]/10 bg-white/80 p-4 shadow-sm">
                                    <h3 className="text-sm font-semibold text-[#1b1a18]">{item.title}</h3>
                                    <p className="mt-2 text-xs text-[#5d5a55]">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute right-6 top-0 h-36 w-36 animate-[float_10s_ease-in-out_infinite] rounded-[32px] border border-[#1b1a18]/10 bg-white/80 p-4 shadow-lg">
                            <div className="text-xs uppercase tracking-[0.3em] text-[#5d5a55]">本月更新</div>
                            <div className="mt-6 text-2xl font-semibold text-[#1b1a18]">{data.hero.updateCount}</div>
                            <div className="text-xs text-[#5d5a55]">新增照片</div>
                        </div>
                        <div className="overflow-hidden rounded-[32px] border border-[#1b1a18]/10 bg-white/80 shadow-2xl shadow-[#c4b8a9]/40">
                            <img
                                alt="封面摄影"
                                className="h-full w-full object-cover"
                                src={data.hero.cover}
                            />
                        </div>
                        <div className="absolute -bottom-10 left-4 hidden rounded-[28px] border border-[#1b1a18]/10 bg-white/80 px-5 py-4 text-sm text-[#5d5a55] shadow-lg md:block">
                            "喜欢把故事写进光里。"
                        </div>
                    </div>
                </section>
            </div>

            <section id="gallery" className="mx-auto max-w-6xl space-y-10 px-6 pb-20">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#5d5a55]">精选作品</p>
                        <h2 className="font-display text-3xl text-[#1b1a18] md:text-4xl">光影里的日常与远方。</h2>
                    </div>
                    <div className="text-sm text-[#5d5a55]">2019 — 2025</div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {data.featuredPhotos.map((photo) => (
                        <div key={photo.title} className="group overflow-hidden rounded-3xl border border-[#1b1a18]/10 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    alt={photo.title}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    src={photo.url}
                                />
                            </div>
                            <div className="flex items-center justify-between px-6 py-5">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1b1a18]">{photo.title}</h3>
                                    <p className="text-sm text-[#5d5a55]">{photo.location}</p>
                                </div>
                                <div className="text-xs uppercase tracking-[0.3em] text-[#5d5a55]">{photo.year}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {data.series.length > 0 && (
                <section id="series" className="mx-auto max-w-6xl space-y-10 px-6 pb-20">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#5d5a55]">主题系列</p>
                        <h2 className="font-display text-3xl text-[#1b1a18] md:text-4xl">一组作品，一段故事。</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {data.series.map((item) => (
                            <div key={item.name} className="group overflow-hidden rounded-3xl border border-[#1b1a18]/10 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        alt={item.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        src={item.cover}
                                    />
                                </div>
                                <div className="px-6 py-5">
                                    <h3 className="text-lg font-semibold text-[#1b1a18]">{item.name}</h3>
                                    <p className="mt-2 text-sm text-[#5d5a55]">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section id="about" className="mx-auto max-w-6xl px-6 pb-24">
                <div className="grid gap-8 rounded-[36px] border border-[#1b1a18]/10 bg-white/80 p-8 shadow-lg md:grid-cols-[1.1fr_0.9fr] md:p-12">
                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#5d5a55]">关于</p>
                        <h2 className="font-display text-3xl text-[#1b1a18] md:text-4xl">镜头里的慢呼吸。</h2>
                        <p className="text-sm text-[#5d5a55]">
                            这里没有商业接单，只记录我在路上遇见的人与风景。照片会按季节整理，慢慢更新。
                        </p>
                    </div>
                    <div className="rounded-3xl border border-[#1b1a18]/10 bg-[#fbf7f0] p-6 text-sm text-[#5d5a55]">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#5d5a55]">联系方式</p>
                        <p className="mt-4 text-lg font-semibold text-[#1b1a18]">hello@lumen.photos</p>
                        <p className="mt-2">如果你只是想聊聊摄影，也欢迎发邮件。</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
