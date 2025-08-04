import { useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useAlert } from "./NotificationSystem";
import { 
  ChatBubbleLeftIcon, 
  HeartIcon, 
  PaperAirplaneIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

interface CommentsSectionProps {
  articleId: string;
  totalComments: number;
}

export function CommentsSection({ articleId, totalComments }: CommentsSectionProps) {
  const { language } = useLanguage();
  const alert = useAlert();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "OtakuMaster99",
      content: language === 'id' 
        ? "Artikel yang sangat menarik! Saya setuju dengan analisisnya tentang perkembangan karakter di arc ini."
        : "Very interesting article! I agree with the character development analysis in this arc.",
      date: "2h ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 2,
          author: "AnimeFan2024",
          content: language === 'id'
            ? "Betul! Terutama bagian tentang motivasi antagonis yang dijelaskan dengan detail."
            : "Exactly! Especially the part about the antagonist's motivation explained in detail.",
          date: "1h ago",
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: 3,
      author: "MangaReviewer",
      content: language === 'id'
        ? "Terima kasih sudah memberikan insight yang mendalam. Ditunggu review episode selanjutnya!"
        : "Thanks for providing deep insights. Looking forward to the next episode review!",
      date: "3h ago",
      likes: 8,
      isLiked: true
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      alert.warning(
        language === 'id' ? 'Peringatan' : 'Warning',
        language === 'id' ? 'Komentar tidak boleh kosong' : 'Comment cannot be empty'
      );
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: "Anda", // In real app, this would be from user session
      content: newComment,
      date: language === 'id' ? 'baru saja' : 'just now',
      likes: 0,
      isLiked: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
    
    alert.success(
      language === 'id' ? 'Berhasil' : 'Success',
      language === 'id' ? 'Komentar berhasil ditambahkan' : 'Comment added successfully'
    );
  };

  const handleLikeComment = (commentId: number, isReply = false, parentId?: number) => {
    setComments(prev => prev.map(comment => {
      if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      
      if (isReply && comment.id === parentId && comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      }
      
      return comment;
    }));
  };

  const handleShareComment = (comment: Comment) => {
    if (navigator.share) {
      navigator.share({
        title: language === 'id' ? 'Komentar dari Conime' : 'Comment from Conime',
        text: comment.content,
        url: window.location.href + `#comment-${comment.id}`
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href + `#comment-${comment.id}`).then(() => {
        alert.success(
          language === 'id' ? 'Berhasil' : 'Success',
          language === 'id' ? 'Link komentar disalin!' : 'Comment link copied!'
        );
      });
    }
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleReply = (commentId: number) => {
    const replyContent = replyInputs[commentId];
    if (!replyContent?.trim()) {
      alert.warning(
        language === 'id' ? 'Peringatan' : 'Warning',
        language === 'id' ? 'Balasan tidak boleh kosong' : 'Reply cannot be empty'
      );
      return;
    }

    const reply: Comment = {
      id: Date.now(),
      author: "Anda",
      content: replyContent,
      date: language === 'id' ? 'baru saja' : 'just now',
      likes: 0,
      isLiked: false
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyInputs(prev => ({ ...prev, [commentId]: "" }));
    alert.success(
      language === 'id' ? 'Berhasil' : 'Success',
      language === 'id' ? 'Balasan berhasil ditambahkan' : 'Reply added successfully'
    );
  };

  return (
    <div id="comment" className="space-y-6">
      <div className="flex items-center space-x-2">
        <ChatBubbleLeftIcon className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold">
          {language === 'id' ? 'Komentar' : 'Comments'} ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Textarea
              placeholder={language === 'id' 
                ? "Tulis komentar Anda di sini..."
                : "Write your comment here..."
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {language === 'id' 
                  ? 'Gunakan bahasa yang sopan dan konstruktif.'
                  : 'Please use polite and constructive language.'
                }
              </p>
              <Button onClick={handleSubmitComment} className="flex items-center space-x-2">
                <PaperAirplaneIcon className="h-4 w-4" />
                <span>{language === 'id' ? 'Kirim' : 'Post'}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Comment Header */}
                <div className="flex items-start space-x-3">
                  <UserCircleIcon className="h-10 w-10 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{comment.author}</span>
                      <Badge variant="secondary" className="text-xs">
                        {comment.date}
                      </Badge>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>

                {/* Comment Actions */}
                <div className="flex items-center space-x-4 pl-13">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center space-x-1 ${
                      comment.isLiked ? 'text-red-500' : 'text-muted-foreground'
                    }`}
                  >
                    <HeartIcon className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareComment(comment)}
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                    <span>{language === 'id' ? 'Bagikan' : 'Share'}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyInputs(prev => ({ ...prev, [comment.id]: prev[comment.id] ? "" : " " }))}
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>{language === 'id' ? 'Balas' : 'Reply'}</span>
                  </Button>

                  {comment.replies && comment.replies.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReplies(comment.id)}
                      className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                    >
                      {showReplies[comment.id] ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                      <span>
                        {comment.replies.length} {language === 'id' ? 'balasan' : 'replies'}
                      </span>
                    </Button>
                  )}
                </div>

                {/* Reply Input */}
                {replyInputs[comment.id] !== undefined && replyInputs[comment.id] !== "" && (
                  <div className="pl-13 space-y-2">
                    <Textarea
                      placeholder={language === 'id' ? "Tulis balasan..." : "Write a reply..."}
                      value={replyInputs[comment.id] || ""}
                      onChange={(e) => setReplyInputs(prev => ({ ...prev, [comment.id]: e.target.value }))}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleReply(comment.id)}
                        className="flex items-center space-x-1"
                      >
                        <PaperAirplaneIcon className="h-3 w-3" />
                        <span>{language === 'id' ? 'Kirim' : 'Reply'}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyInputs(prev => ({ ...prev, [comment.id]: "" }))}
                      >
                        {language === 'id' ? 'Batal' : 'Cancel'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && showReplies[comment.id] && (
                  <div className="pl-13 space-y-3 border-l-2 border-muted">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="pl-4">
                        <div className="flex items-start space-x-3">
                          <UserCircleIcon className="h-8 w-8 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">{reply.author}</span>
                              <Badge variant="secondary" className="text-xs">
                                {reply.date}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">
                              {reply.content}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                className={`flex items-center space-x-1 text-xs ${
                                  reply.isLiked ? 'text-red-500' : 'text-muted-foreground'
                                }`}
                              >
                                <HeartIcon className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                <span>{reply.likes}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleShareComment(reply)}
                                className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary"
                              >
                                <PaperAirplaneIcon className="h-3 w-3" />
                                <span>{language === 'id' ? 'Bagikan' : 'Share'}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Comments */}
      <div className="text-center">
        <Button variant="outline" className="w-full">
          {language === 'id' ? 'Muat Lebih Banyak Komentar' : 'Load More Comments'}
        </Button>
      </div>
    </div>
  );
}