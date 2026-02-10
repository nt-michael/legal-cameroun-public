'use client';

import { useActionState, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitComment, type CommentFormState } from '@/app/actualite/[slug]/actions';
import type { Comment } from '@/lib/wordpress-utils';

interface CommentsSectionProps {
  postId: number;
  comments: Comment[];
  commentStatus: string;
}

const text = {
  commentsTitle: { fr: 'Commentaires', en: 'Comments' },
  noComments: { fr: 'Aucun commentaire pour le moment.', en: 'No comments yet.' },
  leaveComment: { fr: 'Laisser un commentaire', en: 'Leave a comment' },
  replyTo: { fr: 'Répondre à', en: 'Reply to' },
  cancelReply: { fr: 'Annuler', en: 'Cancel' },
  name: { fr: 'Nom', en: 'Name' },
  email: { fr: 'Email', en: 'Email' },
  comment: { fr: 'Commentaire', en: 'Comment' },
  submit: { fr: 'Publier', en: 'Submit' },
  submitting: { fr: 'Envoi...', en: 'Submitting...' },
  reply: { fr: 'Répondre', en: 'Reply' },
  commentCount: { fr: 'commentaire', en: 'comment' },
  commentCountPlural: { fr: 'commentaires', en: 'comments' },
};

function countAllComments(comments: Comment[]): number {
  let count = 0;
  for (const c of comments) {
    count += 1 + countAllComments(c.children);
  }
  return count;
}

function CommentItem({
  comment,
  depth = 0,
  onReply,
}: {
  comment: Comment;
  depth?: number;
  onReply: (commentId: number, authorName: string) => void;
}) {
  const { language } = useLanguage();

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-6' : ''}`}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          {comment.authorAvatar ? (
            <Image
              src={comment.authorAvatar}
              alt={comment.author}
              width={40}
              height={40}
              className="rounded-full flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900 dark:text-white text-sm">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {comment.dateFormatted}
              </span>
            </div>
            <div
              className="text-sm text-gray-600 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
            <button
              onClick={() => onReply(comment.id, comment.author)}
              className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              {text.reply[language]}
            </button>
          </div>
        </div>
      </div>
      {comment.children.map(child => (
        <CommentItem
          key={child.id}
          comment={child}
          depth={depth + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default function CommentsSection({ postId, comments, commentStatus }: CommentsSectionProps) {
  const { language } = useLanguage();
  const [replyTo, setReplyTo] = useState<{ id: number; author: string } | null>(null);

  const initialState: CommentFormState = { success: false };
  const [state, formAction, isPending] = useActionState(submitComment, initialState);

  const totalComments = countAllComments(comments);

  const handleReply = (commentId: number, authorName: string) => {
    setReplyTo({ id: commentId, author: authorName });
    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {text.commentsTitle[language]} ({totalComments})
      </h3>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700 mb-8">
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {text.noComments[language]}
        </p>
      )}

      {/* Comment Form */}
      {commentStatus === 'open' && (
        <div id="comment-form">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {replyTo
              ? `${text.replyTo[language]} ${replyTo.author}`
              : text.leaveComment[language]}
          </h4>

          {replyTo && (
            <button
              onClick={() => setReplyTo(null)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {text.cancelReply[language]}
            </button>
          )}

          {state.success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
              {state.message}
            </div>
          )}

          {state.error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="postId" value={postId} />
            <input type="hidden" name="parentId" value={replyTo?.id || 0} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {text.name[language]} *
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {text.email[language]} *
                </label>
                <input
                  type="email"
                  id="authorEmail"
                  name="authorEmail"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {text.comment[language]} *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? text.submitting[language] : text.submit[language]}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
