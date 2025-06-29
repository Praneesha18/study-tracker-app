import connectToDB from "@/backend/lib/connectToDB";
import { Subject } from "@/backend/models/SubjectandTopic";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  const subjects = [
    {
      name: "Machine Learning",
      topics: [
        { title: "Supervised Learning", description: "A type of machine learning where models are trained on labeled data. Algorithms learn to map input data to the correct output using known examples. Common algorithms include linear regression, logistic regression, and support vector machines.", progress: false },
        { title: "Unsupervised Learning", description: "In this approach, the algorithm works with unlabeled data. It tries to uncover hidden patterns or groupings without explicit outputs. Popular techniques include clustering and dimensionality reduction.", progress: false },
        { title: "Reinforcement Learning", description: "An area of machine learning where an agent learns to make decisions by interacting with an environment, receiving rewards or penalties. Key concepts include states, actions, and rewards.", progress: false },
        { title: "Linear Regression", description: "A fundamental supervised learning algorithm used to predict a continuous output based on one or more input features using a linear relationship.", progress: false },
        { title: "Logistic Regression", description: "Used for binary classification problems, logistic regression models the probability of an instance belonging to a class using a sigmoid function.", progress: false },
        { title: "Decision Trees", description: "A flowchart-like model that splits data based on feature values to make decisions. Easy to interpret and visualize but prone to overfitting.", progress: false },
        { title: "Random Forests", description: "An ensemble learning technique that builds multiple decision trees and merges them to improve accuracy and reduce overfitting.", progress: false },
        { title: "Support Vector Machines (SVM)", description: "SVMs find the optimal hyperplane that separates data points of different classes in the feature space. Effective in high-dimensional spaces.", progress: false },
        { title: "K-Nearest Neighbors (KNN)", description: "A simple algorithm that classifies data points based on the majority class of their 'k' nearest neighbors in the feature space.", progress: false },
        { title: "Naive Bayes", description: "A probabilistic classifier based on Bayes' theorem with an assumption of independence between features.", progress: false },
        { title: "K-Means Clustering", description: "An unsupervised learning algorithm that partitions data into k clusters by minimizing the variance within each cluster.", progress: false },
        { title: "Principal Component Analysis (PCA)", description: "A dimensionality reduction technique that transforms data into a set of orthogonal components that explain the variance in the data.", progress: false },
        { title: "Gradient Descent", description: "An optimization algorithm used to minimize the loss function by iteratively adjusting model parameters in the direction of the negative gradient.", progress: false },
        { title: "Neural Networks", description: "Computational models inspired by biological neural networks. They consist of layers of interconnected neurons that learn complex functions.", progress: false },
        { title: "Convolutional Neural Networks (CNNs)", description: "Specialized neural networks for processing structured grid data like images. CNNs use convolutional layers to detect spatial hierarchies.", progress: false },
        { title: "Recurrent Neural Networks (RNNs)", description: "Neural networks designed for sequential data like time series or natural language, where outputs depend on previous computations.", progress: false },
        { title: "Overfitting and Underfitting", description: "Overfitting occurs when a model performs well on training data but poorly on unseen data. Underfitting occurs when a model is too simple to capture patterns.", progress: false },
        { title: "Regularization (L1 & L2)", description: "Techniques to prevent overfitting by penalizing large weights in the model. L1 (Lasso) and L2 (Ridge) are the most common types.", progress: false },
        { title: "Model Evaluation Metrics", description: "Includes accuracy, precision, recall, F1-score, ROC-AUC, confusion matrix, and other measures to assess model performance.", progress: false },
        { title: "Hyperparameter Tuning", description: "The process of selecting the best set of hyperparameters using techniques like grid search, random search, and Bayesian optimization.", progress: false },
        { title: "Cross-Validation", description: "A model validation technique that divides the dataset into multiple folds and trains/testing across combinations to ensure generalization.", progress: false },
      ],
    },
    {
      name: "Data Structures and Algorithms",
      topics: [
        { title: "Arrays", description: "A fundamental data structure that stores elements in contiguous memory locations. Supports random access but fixed size.", progress: false },
        { title: "Linked Lists", description: "A linear data structure where elements (nodes) are linked using pointers. Includes singly, doubly, and circular linked lists.", progress: false },
        { title: "Stacks", description: "A LIFO (Last-In-First-Out) data structure supporting push and pop operations. Used in parsing, recursion, etc.", progress: false },
        { title: "Queues", description: "A FIFO (First-In-First-Out) data structure. Variants include circular queues, priority queues, and deques.", progress: false },
        { title: "Hash Tables", description: "Stores key-value pairs with constant-time average complexity for insertion, deletion, and lookup using hash functions.", progress: false },
        { title: "Binary Trees", description: "A hierarchical data structure where each node has at most two children: left and right. Basis for many advanced structures.", progress: false },
        { title: "Binary Search Trees", description: "A special binary tree where the left subtree has lesser values and the right has greater values, allowing efficient searching.", progress: false },
        { title: "Heaps", description: "A complete binary tree used to implement priority queues. Max-heaps and min-heaps ensure the root is the largest/smallest.", progress: false },
        { title: "Graphs", description: "A collection of nodes connected by edges. Can be directed or undirected, weighted or unweighted.", progress: false },
        { title: "DFS (Depth First Search)", description: "Graph traversal technique that explores as far as possible along each branch before backtracking.", progress: false },
        { title: "BFS (Breadth First Search)", description: "Graph traversal technique that explores neighbors level by level. Useful in shortest path algorithms.", progress: false },
        { title: "Sorting Algorithms", description: "Includes bubble, selection, insertion, quick, merge, and heap sort. Each has different time/space tradeoffs.", progress: false },
        { title: "Searching Algorithms", description: "Includes linear and binary search. Binary search is efficient for sorted data.", progress: false },
        { title: "Dynamic Programming", description: "A method for solving complex problems by breaking them down into simpler subproblems and storing results for reuse.", progress: false },
        { title: "Greedy Algorithms", description: "Algorithms that make the locally optimal choice at each step. Useful for optimization problems like knapsack.", progress: false },
        { title: "Backtracking", description: "A general algorithmic technique for solving recursive problems by trying out all possibilities and undoing when needed.", progress: false },
        { title: "Trie", description: "A tree-like data structure used for efficient retrieval of strings. Common in autocomplete and dictionary apps.", progress: false },
        { title: "Segment Trees", description: "A tree data structure used for answering range queries and updates efficiently on arrays.", progress: false },
        { title: "Union-Find (Disjoint Set)", description: "Used to track a set of elements partitioned into disjoint subsets. Efficient for graph connectivity.", progress: false },
        { title: "Topological Sort", description: "Ordering of vertices in a directed acyclic graph such that for every edge (u → v), u comes before v.", progress: false },
        { title: "Time and Space Complexity", description: "Big-O notation is used to analyze the efficiency of algorithms in terms of time and memory usage.", progress: false },
      ],
    },
  ];

  try {
    await Subject.deleteMany(); // optional cleanup
    await Subject.insertMany(subjects);
    return NextResponse.json({ message: "Subjects seeded successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Seeding failed", error },
      { status: 500 }
    );
  }
}
