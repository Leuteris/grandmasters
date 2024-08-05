<template>
  <TheChessboard :board-config="boardConfig" reactive-config @board-created="initializeBoard" @move="handleMove"/>

  <button
      @click="nextGame">
    Next Game!
  </button>

  <button
      @click="hint">
    Hint
  </button>

  <button
      @click="clearDatabase">
    Clear database!
  </button>

</template>


<script setup lang="ts">
import {TheChessboard, BoardApi, MoveEvent} from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import {GameStorageHandler} from '../utils/GameStorageHandler';
import {GameStorageValues} from '@/types/localStorageTypes';
import {onMounted} from "vue";
import type {Square} from "chess.js";
import {boardConfig} from "@/config/boardConfig";

let boardAPI: BoardApi | undefined;

function handleMove(moveEvent: MoveEvent) {
  const game: GameStorageValues = GameStorageHandler.getCurrentGame();

  if (isCorrectMove(game, moveEvent)) {
    boardAPI?.hideMoves();
    if (isComputerMove(game.currentMove)) {
      game.currentMove += 1;
      game.fen = boardAPI?.getFen() || '';

      GameStorageHandler.updateCurrentGame(game);

      boardAPI?.move(game.moves[game.currentMove] || '0');
    } else {
      game.currentMove += 1;
      game.fen = boardAPI?.getFen() || '';

      GameStorageHandler.updateCurrentGame(game);
    }
  } else {
    undoLastMove();
  }
}

function nextGame(): void {
  const game: GameStorageValues = GameStorageHandler.getNextGame();
  initializeGame(game);
}

function initializeBoard(api: BoardApi) {
  boardAPI = api;
  const gameValue: GameStorageValues = GameStorageHandler.getCurrentGame();
  initializeGame(gameValue);
}

function initializeGame(game: GameStorageValues) {
  boardConfig.fen = game.fen;
  if (game.currentMove == 0) {
    setTimeout(() => {
      console.log(boardAPI?.move(game.moves[game.currentMove] || '0'));
    }, 300);
  }

}

function hint(): void {
  const gameValue: GameStorageValues = GameStorageHandler.getCurrentGame();
  const squareToHint: string | null = gameValue.moves[gameValue.currentMove]?.slice(0, 2) || null;

  if (squareToHint != null) {
    const square: Square = squareToHint;
    boardAPI?.drawMove(square, square, 'green');
  }
}

function isCorrectMove(gameValue: GameStorageValues, moveEvent: MoveEvent): boolean {
  return gameValue.moves[gameValue.currentMove] === moveEvent.lan;
}

function isComputerMove(currentMove: number): boolean {
  return currentMove % 2 === 1;
}

function undoLastMove() {
  setTimeout(() => {
    boardAPI?.undoLastMove();
  }, 100);
}

// access the boardAPI in the onMounted hook
onMounted(() => {
  boardAPI?.setConfig(boardConfig);
});

function clearDatabase(): void {
  GameStorageHandler.clear();
}

</script>

<style scoped>
</style>
