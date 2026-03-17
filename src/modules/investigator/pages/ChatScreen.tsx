/**
 * Chat Screen - EPIC 3
 * Near-real-time chat con misioneros
 */

import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useAuth } from '../../../context/AuthContext';
import {
  listenToMessages,
  sendMessage,
  type ChatMessage,
} from '../../../services/chatService';
import './ChatScreen.css';

const TEXT_MAX = 2000;

export default function ChatScreen(): JSX.Element {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  useEffect(() => {
    if (!conversationId || !user) return;

    setStatus('loading');
    setErrorMessage(null);

    const unsub = listenToMessages(
      conversationId,
      (msgs) => {
        setMessages(msgs);
        setStatus('ready');
      },
      (err) => {
        if (err?.code === 'permission-denied') {
          setErrorMessage('No tienes acceso a este chat.');
        } else {
          setErrorMessage('Error al cargar mensajes.');
        }
        setStatus('error');
      }
    );

    return () => unsub();
  }, [conversationId, user?.uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || !user || !conversationId) return;
    if (trimmed.length > TEXT_MAX) return;

    setIsSending(true);
    setInputText('');
    try {
      await sendMessage(conversationId, user.uid, trimmed);
    } catch (err: unknown) {
      const isPermissionDenied =
        err && typeof err === 'object' && 'code' in err && (err as { code?: string }).code === 'permission-denied';
      setErrorMessage(
        isPermissionDenied ? 'No tienes acceso a este chat.' : 'No se pudo enviar. Intenta de nuevo.'
      );
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversationId) {
    return (
      <div className="chat-screen">
        <div className="chat-screen__error">Conversación no encontrada</div>
        <Link to="/home" className="chat-screen__back">
          <FaArrowLeft /> Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="chat-screen">
      <header className="chat-screen__header">
        <Link to="/home" className="chat-screen__back" aria-label="Volver">
          <FaArrowLeft />
        </Link>
        <h1 className="chat-screen__title">Chat</h1>
      </header>

      {!isOnline && (
        <div className="chat-screen__offline-banner" role="status">
          Sin conexión. Los mensajes se enviarán al volver.
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="chat-screen__error-banner" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="chat-screen__list" ref={listRef}>
        {status === 'loading' && (
          <div className="chat-screen__loading">Cargando mensajes…</div>
        )}
        {status === 'ready' && messages.length === 0 && (
          <div className="chat-screen__empty">Aún no hay mensajes. ¡Envía el primero!</div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-screen__bubble ${
              msg.senderId === user?.uid ? 'chat-screen__bubble--own' : 'chat-screen__bubble--other'
            }`}
          >
            <p className="chat-screen__bubble-text">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-screen__input-wrap">
        <textarea
          className="chat-screen__input"
          placeholder="Escribe un mensaje…"
          value={inputText}
          onChange={(e) => setInputText(e.target.value.slice(0, TEXT_MAX))}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={TEXT_MAX}
          disabled={!isOnline || isSending}
        />
        <button
          type="button"
          className="chat-screen__send"
          onClick={handleSend}
          disabled={!inputText.trim() || !isOnline || isSending}
          aria-label="Enviar"
        >
          {isSending ? '…' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
