import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { Desert } from './scenes/Desert';
import { UrbenGarden } from './scenes/UrbenGarden';
import { GreenForest} from './scenes/GreenForest';
import { HomePage } from './scenes/HomePage';
import LoadingScene from './scenes/LoadingScene';

const PhaserGame = () => {
    const gameContainer = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Phaser game configuration
        const config = {
            type: Phaser.AUTO,
            width: dimensions.width,
            height: dimensions.height,
            parent: gameContainer.current,
            scene: [LoadingScene,HomePage,UrbenGarden, Desert,GreenForest]
        };

        const game = new Phaser.Game(config);

        // Clean up the event listener and destroy the game instance on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            game.destroy(true);
        };
    }, [dimensions]);

    return <div ref={gameContainer} />;
};

export default PhaserGame;