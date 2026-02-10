'use server';

import { postComment } from '@/lib/wordpress';

export interface CommentFormState {
  success: boolean;
  error?: string;
  message?: string;
}

export async function submitComment(
  prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  const postId = parseInt(formData.get('postId') as string);
  const authorName = (formData.get('authorName') as string)?.trim();
  const authorEmail = (formData.get('authorEmail') as string)?.trim();
  const content = (formData.get('content') as string)?.trim();
  const parentId = parseInt(formData.get('parentId') as string) || 0;

  if (!authorName || !authorEmail || !content) {
    return { success: false, error: 'Tous les champs sont obligatoires.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
    return { success: false, error: 'Adresse email invalide.' };
  }

  if (content.length < 3) {
    return { success: false, error: 'Le commentaire est trop court.' };
  }

  try {
    await postComment({
      post: postId,
      author_name: authorName,
      author_email: authorEmail,
      content,
      parent: parentId || undefined,
    });

    return {
      success: true,
      message: 'Votre commentaire a été soumis et sera visible après modération.',
    };
  } catch (error) {
    console.error('Failed to submit comment:', error);
    return {
      success: false,
      error: 'Erreur lors de la soumission du commentaire. Veuillez réessayer.',
    };
  }
}
