// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const langToggle = document.getElementById('langToggle');

    // --- Safe localStorage wrapper (handles file://, private mode, etc.) ---
    function getStoredLang() {
        try { return localStorage.getItem('homepageLang'); } catch (e) { return null; }
    }
    function setStoredLang(lang) {
        try { localStorage.setItem('homepageLang', lang); } catch (e) { /* ignore */ }
    }

    const translations = {
        en: {
            'nav.logo': 'Hao Yi',
            'nav.about': 'About',
            'nav.publications': 'Publications',
            'nav.experience': 'Experience',
            'nav.education': 'Education',
            'nav.skills': 'Skills',
            'hero.subtitle': 'M.S. Student in Artificial Intelligence',
            'hero.bio': 'I am a second-year Master\'s student at Renmin University of China, advised by <a href="http://ai.ruc.edu.cn/academicfaculty/szdwn/ly/index.htm" target="_blank">Prof. Yong Liu</a> (Tenured Associate Professor and PhD Supervisor). My research interests focus on <strong>Large Language Model Alignment</strong>, <strong>Reinforcement Learning from Human Feedback (RLHF)</strong>, and <strong>LLM-based Agents</strong>.',
            'section.publications': '📝 Publications',
            'section.experience': '💼 Experience',
            'section.education': '🎓 Education',
            'section.skills': '🛠️ Skills',
            'pub.iclr.desc': 'We introduce active learning to optimize Reinforcement Learning from Verifiable Rewards (RLVR), proposing an uncertainty consistency metric to evaluate subjective-objective uncertainty alignment. Our method achieves full-dataset performance using only 30% of the data.',
            'pub.sppd.desc': 'We propose process preference learning with step-level MDP and dynamic value margin based on Bellman equation. Theoretically equivalent to an efficient online policy gradient algorithm, achieving 12.2% and 5.3% improvements on MATH500 and GSM8k respectively.',
            'link.paper': 'Paper',
            'link.code': 'Code',
            'exp.tencent.date': 'Apr 2026 - Present',
            'exp.tencent.role': 'LLM Post-training Algorithm Engineer Intern (青云计划) | Yuanbao Business Unit',
            'exp.tencent.desc': 'Proposed a Goal DAG-based evaluation mechanism for OneAgent with user simulator and LLM Judge. Built evaluation framework for scheduling and image generation skills. OneAgent outperforms Claude by ~5% on these tasks. The solution is deployed on Yuanbao APP.',
            'exp.amap.date': 'Jul 2025 - Feb 2026',
            'exp.amap.role': 'LLM Post-training Algorithm Intern | Foundation Model Team',
            'exp.amap.desc': 'Designed dynamic capability-aware curriculum learning for AMAP STAgent SFT. Qwen-30B outperformed Qwen-235B on TravelBench with our method.',
            'exp.kuaishou.date': 'Apr 2024 - Jun 2025',
            'exp.kuaishou.role': 'LLM Algorithm Intern (RLHF) | Foundation LLM Team',
            'exp.kuaishou.desc': 'Proposed self-evolving preference learning framework with dual-truncation reward strategy, achieving 12.0% and 15.4% improvements on AlpacaEval-v2 and Arena-Hard.',
            'edu.ruc.degree': 'M.S. in Artificial Intelligence',
            'edu.ruc.date': 'Sep 2024 - Present',
            'label.gpa': 'GPA:',
            'edu.uestc.degree': 'B.S. in Computer Science and Technology and Finance',
            'edu.uestc.date': 'Sep 2020 - Jun 2024',
            'edu.uestc.details': '<strong>GPA:</strong> 3.97/4.00 &nbsp;|&nbsp; <strong>Rank:</strong> 1/30<br><strong>Awards:</strong> National Scholarship (2021, Top 1%), National Encouragement Scholarship (2022), First-class Academic Scholarship (2 consecutive years)',
            'skills.research': 'Research Areas',
            'skills.tools': 'Frameworks & Tools',
            'skills.programming': 'Programming',
            'footer.updated': 'Last updated: June 2026'
        },
        zh: {
            'nav.logo': '易浩',
            'nav.about': '关于我',
            'nav.publications': '论文',
            'nav.experience': '经历',
            'nav.education': '教育',
            'nav.skills': '技能',
            'hero.subtitle': '人工智能硕士研究生',
            'hero.bio': '我是中国人民大学人工智能专业二年级硕士研究生，导师为 <a href="http://ai.ruc.edu.cn/academicfaculty/szdwn/ly/index.htm" target="_blank">刘勇教授</a>（长聘副教授、博士生导师）。我的研究兴趣包括 <strong>大语言模型对齐</strong>、<strong>基于人类反馈的强化学习（RLHF）</strong> 和 <strong>基于大语言模型的智能体</strong>。',
            'section.publications': '📝 论文',
            'section.experience': '💼 经历',
            'section.education': '🎓 教育背景',
            'section.skills': '🛠️ 技能',
            'pub.iclr.desc': '我们将主动学习引入基于可验证奖励的强化学习（RLVR），提出不确定性一致性指标，用于评估主观不确定性与客观不确定性的对齐程度。该方法仅使用 30% 数据即可达到全量数据训练效果。',
            'pub.sppd.desc': '我们提出基于步骤级 MDP 和贝尔曼方程动态价值间隔的过程偏好学习方法。理论上，该方法等价于一种高效的在线策略梯度算法，并在 MATH500 和 GSM8k 上分别带来 12.2% 和 5.3% 的提升。',
            'link.paper': '论文',
            'link.code': '代码',
            'exp.tencent.date': '2026.04 - 至今',
            'exp.tencent.role': '大模型后训练算法工程师实习生（青云计划）| 元宝业务线',
            'exp.tencent.desc': '提出面向 OneAgent 的 Goal DAG 评测机制，结合用户模拟器与 LLM Judge；构建调度和图像生成技能的评测框架，使 OneAgent 在相关任务上相比 Claude 提升约 5%，方案已部署于元宝 APP。',
            'exp.amap.date': '2025.07 - 2026.02',
            'exp.amap.role': '大模型后训练算法实习生 | 基础模型团队',
            'exp.amap.desc': '为 AMAP STAgent SFT 设计动态能力感知课程学习方法，使 Qwen-30B 在 TravelBench 上超过 Qwen-235B。',
            'exp.kuaishou.date': '2024.04 - 2025.06',
            'exp.kuaishou.role': '大模型算法实习生（RLHF）| 基础大模型团队',
            'exp.kuaishou.desc': '提出带有双截断奖励策略的自进化偏好学习框架，在 AlpacaEval-v2 和 Arena-Hard 上分别取得 12.0% 和 15.4% 的提升。',
            'edu.ruc.degree': '人工智能硕士',
            'edu.ruc.date': '2024.09 - 至今',
            'label.gpa': '学分绩：',
            'edu.uestc.degree': '计算机科学与技术、金融学双学位学士',
            'edu.uestc.date': '2020.09 - 2024.06',
            'edu.uestc.details': '<strong>学分绩：</strong> 3.97/4.00 &nbsp;|&nbsp; <strong>排名：</strong> 1/30<br><strong>荣誉：</strong> 国家奖学金（2021，Top 1%）、国家励志奖学金（2022）、一等学业奖学金（连续 2 年）',
            'skills.research': '研究方向',
            'skills.tools': '框架与工具',
            'skills.programming': '编程能力',
            'footer.updated': '最后更新：2026 年 6 月'
        }
    };

    function setLanguage(lang) {
        const dict = translations[lang] || translations.en;
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key]) el.textContent = dict[key];
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            if (dict[key]) el.innerHTML = dict[key];
        });

        document.querySelectorAll('[data-lang-label]').forEach(el => {
            el.classList.toggle('active', el.dataset.langLabel === lang);
        });

        setStoredLang(lang);
    }

    const savedLang = getStoredLang() || 'en';
    setLanguage(savedLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = getStoredLang() || 'en';
            setLanguage(currentLang === 'en' ? 'zh' : 'en');
        });
    }

    // --- Mobile nav toggle ---
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // --- Navbar scroll shadow ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === '#' + current) {
                anchor.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- Back to top button ---
    window.addEventListener('scroll', () => {
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Smooth reveal animation on scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);
            }
        });
    }, observerOptions);

    // Observe all animatable elements with staggered delay
    document.querySelectorAll('.pub-item, .timeline-item, .edu-item, .skill-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.dataset.delay = index * 80;  // staggered delay
        observer.observe(el);
    });
});
