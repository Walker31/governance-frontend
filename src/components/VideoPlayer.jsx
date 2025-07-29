import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const VideoPlayer = ({
  thumbnailSrc,
  title,
  description,
  duration,
  youtubeId = "dQw4w9WgXcQ", // Default placeholder
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  return (
    <>
      {/* Video Thumbnail */}
      <div
        className="relative rounded-lg overflow-hidden group cursor-pointer"
        onClick={handlePlayClick}
      >
        <img
          src={thumbnailSrc}
          alt={title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform shadow-xl">
            <Play className="w-12 h-12 text-blue-600" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={isPlaying} onOpenChange={handleClosePlayer}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
              <Button variant="ghost" size="sm" onClick={handleClosePlayer}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 p-6 pt-0 overflow-auto">
            {/* YouTube Embedded Video */}
            <div className="relative w-full h-96 mb-6">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Demo Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Complete AI system inventory and classification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Automated risk assessment and scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Real-time compliance monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Policy management and enforcement
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Comprehensive audit reporting
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Demo Highlights</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>AI Inventory Setup</span>
                    <span className="text-muted-foreground">0:30 - 1:45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risk Assessment Dashboard</span>
                    <span className="text-muted-foreground">1:45 - 3:10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Compliance Frameworks</span>
                    <span className="text-muted-foreground">3:10 - 4:20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reporting & Analytics</span>
                    <span className="text-muted-foreground">4:20 - 5:42</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Ready to Get Started?</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule a personalized demo with our team
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Book Demo
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;
