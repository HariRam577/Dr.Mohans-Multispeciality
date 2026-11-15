import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import type { MedicalArticle } from '../data/insights';
import { ClinicalImage } from './ClinicalImage';

interface ArticleModalProps {
  article: MedicalArticle | null;
  onClose: () => void;
  onExploreSpeciality: (slug: string) => void;
}

export function ArticleModal({ article, onClose, onExploreSpeciality }: ArticleModalProps) {
  useEffect(() => {
    if (!article) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [article, onClose]);

  return (
    <AnimatePresence>
      {article && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#172B45]/50 backdrop-blur-[2px]"
          />

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <ClinicalImage
              src={article.image}
              alt={article.title}
              className="w-full h-56 sm:h-64"
            />

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                    <span className="font-semibold text-[#3C76C1]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2
                    id="article-modal-title"
                    className="font-display text-2xl sm:text-3xl font-bold text-[#172B45] leading-tight"
                  >
                    {article.title}
                  </h2>
                  <p className="text-xs text-[#64748B]">Medically reviewed by {article.reviewedBy}</p>
                </div>

                <button
                  type="button"
                  aria-label="Close article"
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg border border-[#172B45]/12 flex items-center justify-center text-[#172B45] hover:bg-[#F7F9FC] shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-base text-[#172B45]/90 leading-relaxed font-medium">
                {article.excerpt}
              </p>

              <div className="space-y-5 pt-2 border-t border-[#172B45]/10">
                {article.sections.map((section) => (
                  <section key={section.heading} className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-[#172B45]">
                      {section.heading}
                    </h3>
                    <p className="text-[15px] text-[#172B45]/80 leading-relaxed">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>

              <div className="pt-4 border-t border-[#172B45]/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#64748B]">
                  For personalized clinical guidance, consult a specialist.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreSpeciality(article.specialitySlug);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#174A80] hover:bg-[#3C76C1] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Explore {article.category} Department</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
